<script setup lang="ts">
import type { VerifiedWebsiteContent } from "~~/types";

const { params: { slug } } = useRoute();
const { data: app, error } = await useAsyncData(`app-${slug}`, () => queryContent<VerifiedWebsiteContent>(`/${slug}`).findOne());
if (!app.value || error.value) {
  throw createError({
    statusCode: 404,
    message: "App not found",
  });
}

useSeoMeta({
  title: app.value.name,
  description: `Install ${app.value.name} as desktop app on your Mac, Windows or Linux device.`,
  ogImage: app.value.screenshot,
});

const config = computed(() => [
  {
    key: "Name",
    value: app.value?.name,
  },
  {
    key: "URL",
    value: app.value?.url,
  },
  {
    key: "Logo",
    value: app.value?.logo,
  },
  {
    key: "Mac Logo",
    value: app.value?.macLogo || "-",
  },
  {
    key: "Tags",
    value: app.value?.tags?.join(", ") || "-",
  },
]);
</script>

<template>
  <main v-if="app">
    <AppStickyHeader :title="app.name" />

    <UContainer>
      <div class="my-1 flex items-center gap-3 py-4 sm:my-4 sm:gap-5">
        <NuxtImg
          v-if="app.macLogo || app.logo"
          :src="app.macLogo || app.logo"
          alt="MacOS logo"
          width="96"
          height="96"
          class="size-14 rounded-xl border border-gray-300 shadow dark:border-gray-700 sm:size-24 sm:rounded-3xl sm:shadow-md"
        />

        <div class="flex shrink flex-col overflow-hidden">
          <h1 class="font-title text-xl font-black uppercase sm:text-4xl">
            {{ app.name }}
          </h1>
          <p class="text-sm text-gray-500 sm:text-lg">
            {{ app.description }}
          </p>
        </div>

        <div class="ml-auto flex gap-1">
          <UButton
            variant="ghost"
            to="#install"
            data-umami-event="Install btn"
            icon="material-symbols:download"
            :ui="{ rounded: 'rounded-xl' }"
            aria-label="Install Web App"
            @click="copyCode(app)"
          />
          <UButton
            variant="ghost"
            data-umami-event="Share verified app"
            icon="material-symbols:share"
            :ui="{ rounded: 'rounded-xl' }"
            aria-label="Share Web App"
            @click="copyLink(app)"
          />
        </div>
      </div>

      <NuxtPicture
        format="avif,webp"
        :src="app.screenshot"
        alt="Screenshot of TodoMate"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1216px"
        :img-attrs="{ class: 'w-full border border-gray-300 dark:border-gray-700 aspect-card-img bg-gray-50 overflow-hidden rounded-lg sm:rounded-xl' }"
      />

      <UCard
        :ui="{ body: { padding: 'sm:p-3 p-3' } }"
        class="mx-auto my-5"
      >
        <TargetSettings />
      </UCard>

      <UCard
        id="install"
        class="my-5"
        :ui="{ body: { padding: '' } }"
      >
        <template #header>
          <p>Install {{ app.name }}:</p>
        </template>

        <div class="space-y-2 px-4 py-5 sm:px-6">
          <p>1. Make sure to choose the right OS and Browser in the config section above.</p>
          <p class="inline-flex flex-wrap items-center gap-1 whitespace-normal">
            <span>2. </span> <UButton
              variant="link"
              size="sm"
              :padded="false"
              data-umami-event="Copy verified code"
              icon="material-symbols:content-copy-outline-rounded"
              label="Copy this code snipet"
              @click="copyCode(app)"
            /> <span>and don't hesitate to</span> <UButton
              variant="link"
              size="sm"
              :padded="false"
              data-umami-event="Copy verified code"
              icon="material-symbols:open-in-new"
              label="check it's content."
              target="_blank"
              external
              :to="getInstallURL(app)"
            />
          </p>
          <p>3. Paste the code in your termial of choice.</p>
          <p>4. You can now find and use <b>{{ app.name }}</b> just like any other app on your OS! 🎉</p>
        </div>
      </UCard>

      <UCard
        class="my-5"
        :ui="{ body: { padding: '' } }"
      >
        <template #header>
          <p>App Configuration:</p>
        </template>
        <UTable :rows="config" />
      </UCard>

      <div class="mt-20 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <UButton
          size="xl"
          :ui="{ rounded: 'rounded-full' }"
          variant="outline"
          target="_blank"
          label="Edit this page"
          leading-icon="simpleicons:github"
          external
          rel="nofollow"
          :to="`https://github.com/mathix420/free-the-web-apps/tree/master/content/${app._file}`"
        />
      </div>
    </UContainer>
  </main>
</template>
