<script setup lang="ts">
import type { TargetInfos, VerifiedWebsiteType } from "~~/types";

const props = defineProps<{
  website: VerifiedWebsiteType;
}>();

const route = useRoute();
const appId = computed(() => `app-${props.website.id}`);
const isCardSelected = ref(false);

onMounted(() => {
  watchEffect(() => {
    isCardSelected.value = `#${appId.value}`.toLowerCase() === route.hash.toLowerCase();
  });
});

const targetInfos = useState<TargetInfos>("target-infos");
const { remoteUrl } = useRuntimeConfig().public;
const { copy } = useCopyToClipboard();

function copyCode(website: VerifiedWebsiteType) {
  const code = `sh -c "$(curl -fsSL '${remoteUrl}/v/${website.id}`
    + `?os=${targetInfos.value.os}`
    + `&bw=${targetInfos.value.bw}`
    + `&path=${encodeURIComponent(targetInfos.value.path)}')"`;

  useRouter().replace({ hash: "#" });

  copy(code, { title: "Command copied!", description: "Paste on terminal to install the app." }, { title: "Failed to copy!" });
}

function copyLink(website: VerifiedWebsiteType) {
  const link = `${remoteUrl}/#app-${website.id}`;
  copy(link, { title: "Link copied!", description: "Share this link with anyone." }, { title: "Failed to copy!" });
}
</script>

<template>
  <UCard
    :id="appId"
    class="max-w-[588px]"
    :ui="{
      background: 'bg-primary-600/5 dark:bg-primary-400/5',
      rounded: 'rounded-2xl sm:rounded-2xl',
      body: {
        padding: '',
      },
      ring: isCardSelected ? 'ring-2 ring-primary-500 dark:ring-primary-400' : '',
      divide: '',
    }"
  >
    <div class="px-5 py-4 flex justify-between">
      <div>
        <UButton
          data-umami-event="Visit verified app"
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
      <div class="flex items-center gap-1">
        <UButton
          variant="ghost"
          data-umami-event="Share verified app"
          icon="material-symbols:share"
          :ui="{ rounded: 'rounded-xl' }"
          aria-label="Share Web App"
          @click="copyLink(website)"
        />
        <UButton
          variant="ghost"
          data-umami-event="Copy verified code"
          icon="material-symbols:content-copy-outline-rounded"
          :ui="{ rounded: 'rounded-xl' }"
          aria-label="Copy code"
          @click="copyCode(website)"
        />
      </div>
    </div>

    <NuxtImg
      :src="website.screenshot"
      :alt="website.name"
      width="588px"
      loading="lazy"
      class="w-full rounded-lg sm:rounded-xl rounded-b-2xl sm:rounded-b-2xl"
    />
  </UCard>
</template>
