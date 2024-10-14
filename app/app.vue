<script setup lang="ts">
useHead({
  meta: [
    {
      name: "theme-color",
      media: "(prefers-color-scheme: dark)",
      content: "#211830",
    },
    {
      name: "theme-color",
      media: "(prefers-color-scheme: light)",
      content: "#fbfafe",
    },
  ],
  link: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      href: "/favicon.png",
    },
  ],
});

useScript({
  "src": "https://cloud.umami.dev/script.js",
  "defer": true,
  "async": true,
  "data-website-id": "5e1460d0-4669-4652-8079-17d5602c9abd",
}, {
  trigger: onMounted,
});

useSeoMeta({
  ogImage: "/og.png",
});
</script>

<template>
  <Html
    lang="en-US"
    class="scroll-pt-5"
  >
    <Body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <NuxtPage />

      <AppFooter class="mt-36" />

      <UNotifications />
    </Body>
  </Html>
</template>
