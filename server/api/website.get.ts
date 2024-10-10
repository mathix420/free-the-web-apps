import type { WebAppManifest } from "web-app-manifest";

function getBiggestManifestIcon(icons: WebAppManifest["icons"]) {
  if (!icons || !icons.length) {
    return null;
  }
  return icons.sort((a, b) => {
    const aSize = parseInt(a.sizes?.split("x")[0] || "0");
    const bSize = parseInt(b.sizes?.split("x")[0] || "0");
    return bSize - aSize;
  })[0]?.src;
}

export default defineEventHandler(async (event) => {
  const { url } = getQuery(event);

  if (!url || typeof url !== "string") {
    throw createError("Valid URL is required");
  }

  const head = await useHtmlFetch(url)
    .then(r => r.querySelector("head"))
    .catch(() => null);

  if (!head) {
    throw createError("Failed to fetch HTML");
  }

  const { origin } = new URL(url);

  function safeUrl(href: string | null) {
    if (href === null) return null;
    if (/^https?:\/\//.test(href)) return href;
    if (href.startsWith("/")) return `${origin}${href}`;
    return `${origin}/${href}`;
  }

  const manifestUrl = head.querySelector("link[rel='manifest']")?.getAttribute("href");

  if (manifestUrl) {
    const webManifest = await $fetch<WebAppManifest>(safeUrl(manifestUrl), { responseType: "json" }).catch(() => null);

    if (webManifest) {
      return {
        name: webManifest.short_name || webManifest.name || "",
        description: webManifest.description || "",
        icon: safeUrl(getBiggestManifestIcon(webManifest.icons)),
      };
    }
  }

  return {
    name: head.querySelector("title")?.textContent || "",
    description:
      head.querySelector("meta[name='description']")?.getAttribute("content")
      || head.querySelector("meta[name='og:description']")?.getAttribute("content")
      || "",
    icon: safeUrl(
      head.querySelector("link[rel='apple-touch-icon']")?.getAttribute("href")
      || head.querySelector("link[rel='icon']")?.getAttribute("href")
      || head.querySelector("link[rel='shortcut icon']")?.getAttribute("href")
      || `${origin}/favicon.ico`,
    ),
  };
});
