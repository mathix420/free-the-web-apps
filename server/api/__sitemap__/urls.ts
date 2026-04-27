import { execSync } from "node:child_process";
import type { ParsedContent } from "@nuxt/content";
import { serverQueryContent } from "#content/server";
import { asSitemapUrl, defineSitemapEventHandler } from "#imports";

function getLastModified(file: string): string | undefined {
  try {
    const date = execSync(
      `git log -1 --format=%cI -- "content/${file}"`,
      { encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    return date || undefined;
  }
  catch {
    return undefined;
  }
}

export default defineSitemapEventHandler(async (e) => {
  const contentList = (await serverQueryContent(e).find()) as ParsedContent[];
  return contentList
    .map((c) => {
      return asSitemapUrl({
        loc: `/app/${c.id}`,
        lastmod: c._file ? getLastModified(c._file) : undefined,
      });
    });
});
