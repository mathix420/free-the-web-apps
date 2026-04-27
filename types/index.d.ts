import type { ParsedContent } from "@nuxt/content";
import type { VerifiedWebsiteType } from "~~/types";

export interface WebsiteType {
  id: string;
  url: string;
  name: string;
  logo: string;
  tags: string[];
  logoSize: number;
}

export interface AppFeature {
  title: string;
  description: string;
}

export interface AppFaq {
  question: string;
  answer: string;
}

export interface VerifiedWebsiteType extends WebsiteType {
  description: string;
  screenshot: string;
  macLogo?: string;
  longDescription?: string;
  category?: string;
  developer?: string;
  pricing?: string;
  platforms?: string[];
  features?: AppFeature[];
  useCases?: string[];
  faq?: AppFaq[];
}

export interface VerifiedWebsiteContent extends ParsedContent, VerifiedWebsiteType {};

export type OS = "windows" | "linux" | "macos";
export type Browser = "chrome" | "firefox" | "edge" | "safari" | "opera" | "brave";

export interface TargetInfos {
  path: string;
  bw: Browser;
  os: OS;
}

export type SubmitWebsite = Omit<WebsiteType, "id">;
