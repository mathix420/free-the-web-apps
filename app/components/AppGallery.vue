<script setup lang="ts">
import type { TargetInfos, VerifiedWebsiteType } from "~~/types";
import websites from "~~/apps.json";

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
