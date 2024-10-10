export interface WebsiteType {
  id: string;
  url: string;
  name: string;
  logo: string;
  logoSize: number;
}

export interface VerifiedWebsiteType extends WebsiteType {
  description: string;
  screenshot: string;
}

export type OS = "windows" | "linux" | "macos";
export type Browser = "chrome" | "firefox" | "edge" | "safari" | "opera" | "brave";

export interface TargetInfos {
  path: string;
  bw: Browser;
  os: OS;
}

export type SubmitWebsite = Omit<WebsiteType, "id">;
