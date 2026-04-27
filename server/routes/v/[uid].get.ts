import type { TargetInfos, VerifiedWebsiteContent } from "~~/types";
import templates from "~~/server/templates";

export default defineEventHandler(async (event) => {
  const { uid } = getRouterParams(event);
  const target = getQuery<Partial<TargetInfos>>(event);

  setHeader(event, "Content-Type", "text/x-shellscript");

  if (!target.path || !target.os || !target.bw || !target.path) {
    return "echo '\nERROR: Missing target infos.'";
  }

  if (["safari"].includes(target.bw)) {
    return "echo '\nERROR: Target unsupported (yet).'";
  }

  const website = (await $fetch("/api/_content/query", {
    query: {
      _params: { where: { id: uid }, limit: 1 },
    },
  }))?.[0] as VerifiedWebsiteContent;

  if (!website) {
    return `echo '\nERROR: Website not found.'
echo 'NOTE: Unverified links (starting with /u/) expires after 24 hours.'`;
  }

  const siteUrl = useSiteConfig(event).url || "https://ftwa.mathix.dev";
  const toAbsolute = (url?: string) =>
    url && url.startsWith("/") ? `${siteUrl}${url}` : url;

  website.logo = toAbsolute(website.logo)!;
  if (website.macLogo) website.macLogo = toAbsolute(website.macLogo);

  return templates[target.os]({ website, target });
});
