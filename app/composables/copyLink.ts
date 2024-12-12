import type { VerifiedWebsiteType } from "~~/types";

export function copyLink(website: VerifiedWebsiteType) {
  const { remoteUrl } = useRuntimeConfig().public;
  const { copy } = useCopyToClipboard();

  const link = `${remoteUrl}/app/${website.id}`;
  copy(link, { title: "Link copied!", description: "Share this link with anyone." }, { title: "Failed to copy!" });
}
