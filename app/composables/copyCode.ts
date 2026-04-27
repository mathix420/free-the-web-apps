import type { VerifiedWebsiteType } from "~~/types";

export function copyCode(website: VerifiedWebsiteType) {
  const { copy } = useCopyToClipboard();

  const code = getInstallCommand(website);

  useRouter().replace({ hash: "#" });

  copy(code, { title: "Command copied!", description: "Paste in terminal to install the app." }, { title: "Failed to copy!" });
}
