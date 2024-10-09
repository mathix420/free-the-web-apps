<script setup lang="ts">
import type { TargetInfos, VerifiedWebsiteType } from "~~/types";

const websites: VerifiedWebsiteType[] = [
  {
    id: "1",
    name: "TodoMate",
    description: "A simple todo app",
    url: "https://todomate.net",
    logo: "https://www.todomate.net/favicon.png",
    screenshot: "/todomate-screenshot.png",
    logoSize: 128,
  },
  {
    id: "4",
    name: "YouTube Music",
    description: "A website to listen to music",
    url: "https://music.youtube.com",
    logo: "https://cdn.iconscout.com/icon/free/png-256/free-youtube-music-logo-icon-download-in-svg-png-gif-file-formats--social-network-media-pack-logos-icons-3357685.png",
    screenshot: "/youtube-music-screenshot.png",
    logoSize: 256,
  },
];

const targetInfos = useState<TargetInfos>("target-infos");
const { remoteUrl } = useRuntimeConfig().public;
const { copy } = useCopyToClipboard();

function copyCode(website: VerifiedWebsiteType) {
  const code = `sh -c "$(curl -fsSL '${remoteUrl}/v/${website.id}`
    + `?os=${targetInfos.value.os}`
    + `&bw=${targetInfos.value.bw}`
    + `&path=${encodeURIComponent(targetInfos.value.path)}')"`;

  copy(code, { title: "Copied!", description: "Paste on terminal to install the app." }, { title: "Failed!" });
}
</script>

<template>
  <div class="flex flex-wrap gap-5 sm:gap-10 justify-center">
    <UCard
      v-for="website in websites"
      :key="website.id"
      class="max-w-[588px]"
      :ui="{
        background: 'bg-primary-600/5 dark:bg-primary-400/5',
        rounded: 'rounded-2xl sm:rounded-2xl',
        body: {
          padding: '',
        },
        ring: '',
        divide: '',
      }"
    >
      <div class="px-5 py-4 flex justify-between">
        <div>
          <UButton
            class="text-lg font-bold text-primary-500 dark:text-primary-400"
            variant="link"
            aria-label="Visit website"
            :to="website.url"
            :label="website.name"
            target="_blank"
            :padded="false"
            external
            trailing-icon="material-symbols:open-in-new"
          />

          <p
            class="text-sm text-primary-500/80 dark:text-primary-400/80"
          >
            {{ website.description }}
          </p>
        </div>

        <!-- Copy code icon -->
        <!-- icon="heroicons:arrow-down-tray-20-solid" -->
        <UButton
          variant="ghost"
          icon="material-symbols:content-copy-outline-rounded"
          :ui="{
            rounded: 'rounded-xl',
          }"
          aria-label="Copy code"
          class="my-auto"
          @click="copyCode(website)"
        />
      </div>

      <NuxtImg
        :src="website.screenshot"
        :alt="website.name"
        width="588px"
        loading="lazy"
        class="w-full rounded-lg sm:rounded-xl rounded-b-2xl sm:rounded-b-2xl"
      />
    </UCard>
  </div>
</template>
