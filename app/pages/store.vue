<script setup lang="ts">
import type { VerifiedWebsiteContent } from "~~/types";

const { data } = await useAsyncData("all-apps", () => queryContent<VerifiedWebsiteContent>().find());

const allTags = computed(() => data.value?.map(x => x.tags)?.flat()?.filter((x, i, a) => a.indexOf(x) === i));

const tags = ref<{
  name: string;
  selected: boolean;
}[]>([]);

watchEffect(() => {
  if (allTags.value) {
    tags.value = allTags.value.map(tag => ({ name: tag, selected: false }));
  }
});

const selectedTags = computed(() => tags.value.filter(x => x.selected).map(x => x.name));

const filterData = computed(() => {
  if (selectedTags.value.length === 0) return data.value;
  return data.value?.filter(x => selectedTags.value.every(tag => x.tags.includes(tag)));
});
</script>

<template>
  <div>
    <header class="z-10 px-5 py-3 flex justify-center gap-2 items-center sticky top-0 inset-x-0 shadow dark:bg-black/5 bg-white/20 backdrop-brightness-150 dark:backdrop-brightness-50 backdrop-blur-xl">
      <NuxtLink
        to="/"
        class="flex gap-2 items-center absolute left-5 inset-y-0"
      >
        <NuxtImg
          src="/favicon.png"
          class="size-10 drop-shadow-md"
          alt="FTWA Logo"
        />
        <p class="font-black sm:not-sr-only sr-only font-title text-3xl italic uppercase">
          FTWA
        </p>
      </NuxtLink>

      <p class="font-black font-title text-3xl italic uppercase">
        App Store
      </p>
    </header>

    <UContainer class="py-10 space-y-5 sm:space-y-10">
      <h1 class="font-title text-4xl text-center sm:text-5xl font-black uppercase">
        App Store
      </h1>

      <div class="flex gap-2 justify-center items-center flex-wrap">
        <UButton
          v-for="tag in tags"
          :key="tag.name"
          size="lg"
          :ui="{ rounded: 'rounded-full' }"
          :variant="tag.selected ? 'solid' : 'outline'"
          :label="tag.name"
          :leading-icon="tag.selected ? 'lucide:filter-x' : 'lucide:filter'"
          @click="tag.selected = !tag.selected"
        />
      </div>

      <AppGallery
        v-if="filterData"
        :websites="filterData"
      />
    </UContainer>
  </div>
</template>
