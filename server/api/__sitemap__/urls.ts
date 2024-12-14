import type { ParsedContent } from "@nuxt/content";
import { serverQueryContent } from "#content/server";
import { asSitemapUrl, defineSitemapEventHandler } from "#imports";

export default defineSitemapEventHandler(async (e) => {
  const contentList = (await serverQueryContent(e).find()) as ParsedContent[];
  return contentList
    .map((c) => {
      return asSitemapUrl({
        loc: `/app/${c.id}`,
      });
    });
});
