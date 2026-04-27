import type { TargetInfos, VerifiedWebsiteType } from "~~/types";

export function getInstallURL(website: Pick<VerifiedWebsiteType, "id">, verified = true): string {
  const targetInfos = useState<TargetInfos>("target-infos");
  const { remoteUrl } = useRuntimeConfig().public;

  return `${remoteUrl}/${verified ? "v" : "u"}/${website.id}`
    + `?os=${targetInfos.value.os}`
    + `&bw=${targetInfos.value.bw}`
    + `&path=${encodeURIComponent(targetInfos.value.path)}`;
}

export function getInstallCommand(website: Pick<VerifiedWebsiteType, "id">, verified = true): string {
  const targetInfos = useState<TargetInfos>("target-infos");
  const url = getInstallURL(website, verified);

  if (targetInfos.value.os === "windows") {
    return `powershell -NoProfile -Command "iex ((New-Object Net.WebClient).DownloadString('${url}'))"`;
  }
  return `sh -ec "$(curl -fsSL '${url}')"`;
}
