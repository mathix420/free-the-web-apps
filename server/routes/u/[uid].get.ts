import type { TargetInfos, WebsiteType } from "~~/types";
import templates from "~~/templates";

export default defineEventHandler(async (event) => {
  const { uid } = getRouterParams(event);
  const target = getQuery<Partial<TargetInfos>>(event);

  setHeader(event, "Content-Type", "text/x-shellscript");

  if (!target.path || !target.os || !target.bw || !target.path) {
    return "echo '\\nERROR: Missing target infos.'";
  }

  if (!["linux", "macos"].includes(target.os) || !["chrome", "brave", "edge", "opera"].includes(target.bw)) {
    return "echo '\\nERROR: Target unsupported (yet).'";
  }

  const website = await hubKV().get<WebsiteType>(`unverified-website:${uid}`);

  if (!website) {
    return `echo '\\nERROR: Website not found.'
echo 'NOTE: Unverified links (starting with /u/) expires after 24 hours.'`;
  }

  return templates[target.os]({ website, target });
});
