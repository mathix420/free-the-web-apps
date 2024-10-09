<script setup lang="ts">
useHead({
  title: "FTWA - Free The Web Apps",
  meta: [
    {
      name: "description",
      content: "Free the web apps from your browser's frame, because they deserve it.",
    },
    {
      name: "theme-color",
      media: "(prefers-color-scheme: dark)",
      content: "#24182d",
    },
    {
      name: "theme-color",
      media: "(prefers-color-scheme: light)",
      content: "#fdfaff",
    },
  ],
  script: [
    {
      "src": "https://cloud.umami.is/script.js",
      "defer": true,
      "async": true,
      "data-website-id": "5e1460d0-4669-4652-8079-17d5602c9abd",
    },
  ],
});
</script>

<template>
  <Html lang="en-US">
    <Body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white pb-36">
      <NuxtPage />

      <UNotifications />
    </Body>
  </Html>
</template>
