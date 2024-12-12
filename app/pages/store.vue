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

useSeoMeta({
  title: "App Store",
  description: "Discover, explore and install the best free web apps on the internet.",
});

const selectedTags = computed(() => tags.value.filter(x => x.selected).map(x => x.name));

const filterData = computed(() => {
  if (selectedTags.value.length === 0) return data.value;
  return data.value?.filter(x => selectedTags.value.every(tag => x.tags.includes(tag)));
});
</script>

<template>
  <main>
    <AppStickyHeader title="App Store" />

    <UContainer class="space-y-5 py-10 sm:space-y-10">
      <h1 class="text-center font-title text-4xl font-black uppercase sm:text-5xl">
        App Store
      </h1>

      <div class="flex flex-wrap items-center justify-center gap-2">
        <UButton
          v-for="tag in tags.sort((a, b) => a.name.localeCompare(b.name))"
          :key="tag.name"
          size="lg"
          :ui="{ rounded: 'rounded-full' }"
          :variant="tag.selected ? 'solid' : 'outline'"
          :label="tag.name"
          :leading-icon="tag.selected ? 'lucide:filter-x' : 'lucide:filter'"
          @click="tag.selected = !tag.selected"
        />
      </div>

      <UCard
        :ui="{ body: { padding: 'sm:p-3 p-3' } }"
        class="mx-auto mb-5 max-w-[588px] xl:max-w-none"
      >
        <TargetSettings />
      </UCard>

      <AppGallery
        v-if="filterData"
        :websites="filterData"
      />

      <div class="!mt-20 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <UButton
          size="xl"
          :ui="{ rounded: 'rounded-full' }"
          variant="outline"
          label="Go Back to FTWA Home"
          leading-icon="heroicons:arrow-left"
          to="/"
        />
      </div>
    </UContainer>
  </main>
</template>
