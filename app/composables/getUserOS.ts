import type { OS } from "~~/types";

export default function (exclude: OS[]): OS {
  const { isWindows, isMacOS, isAndroid, isApple } = useDevice();
  if (isAndroid) {
    return "linux";
  }
  else if (isWindows && !exclude.includes("windows")) {
    return "windows";
  }
  else if ((isMacOS || isApple) && !exclude.includes("macos")) {
    return "macos";
  }
  return "linux";
}
