<script setup lang="ts">
import type { VerifiedWebsiteType } from "~~/types";

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
</script>

<template>
  <UCard
    :id="appId"
    class="w-full max-w-[588px]"
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
    <div class="flex justify-between px-5 py-4">
      <div>
        <UButton
          data-umami-event="Visit verified app"
          class="text-lg font-bold text-primary-500 dark:text-primary-400"
          variant="link"
          aria-label="Visit website"
          :to="`/app/${website.id}`"
          :label="website.name"
          :padded="false"
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

    <NuxtPicture
      format="avif,webp"
      :src="website.screenshot"
      :alt="website.name"
      sizes="588px"
      loading="lazy"
      :img-attrs="{ class: 'w-full aspect-card-img rounded-lg sm:rounded-xl rounded-b-2xl sm:rounded-b-2xl' }"
    />
  </UCard>
</template>
