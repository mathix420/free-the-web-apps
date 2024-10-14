import type { OS } from "~~/types";

export default function (exclude: OS[]): OS {
  const { isWindows, isMacOS } = useDevice();
  if (isWindows && !exclude.includes("windows")) {
    return "windows";
  }
  else if (isMacOS && !exclude.includes("macos")) {
    return "macos";
  }
  return "linux";
}
