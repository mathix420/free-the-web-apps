import type { Browser } from "~~/types";

export default function (exclude: Browser[]): Browser {
  const { isFirefox, isEdge, isSafari, isChrome, userAgent } = useDevice();
  if (isFirefox && !exclude.includes("firefox")) {
    return "firefox";
  }
  else if (isEdge && !exclude.includes("edge")) {
    return "edge";
  }
  else if (isSafari && !exclude.includes("safari")) {
    return "safari";
  }
  else if (isChrome && !exclude.includes("chrome")) {
    // Check if it's Opera, Brave or Chrome
    if ((userAgent.includes("OPR") || userAgent.includes("Opera")) && !exclude.includes("opera")) {
      return "opera";
    }
    if (import.meta.client && window?.navigator?.brave?.isBrave && !exclude.includes("brave")) {
      return "brave";
    }
    return "chrome";
  }
  return "chrome";
}
