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

const websiteBaseURL = useSiteConfig().url || "https://ftwa.mathix.dev";
const fullImageURL = `${websiteBaseURL}${app.value.screenshot}`;

const metaDescription = app.value.longDescription
  ? `${app.value.longDescription.slice(0, 155).trim()}${app.value.longDescription.length > 155 ? "…" : ""}`
  : `Install ${app.value.name} as a desktop app on your Mac, Windows or Linux device. ${app.value.description}`;

useSeoMeta({
  title: `${app.value.name} as a Desktop App`,
  description: metaDescription,
  ogTitle: `${app.value.name} — install as a desktop app`,
  ogDescription: metaDescription,
  ogImage: fullImageURL,
  twitterCard: "summary_large_image",
  twitterTitle: `${app.value.name} — install as a desktop app`,
  twitterDescription: metaDescription,
  twitterImage: fullImageURL,
});

useSchemaOrg([
  defineSoftwareApp({
    name: app.value.name,
    description: app.value.longDescription || app.value.description,
    applicationCategory: (app.value.category || "BrowserApplication") as never,
    operatingSystem: "macOS, Windows, Linux",
    url: `${websiteBaseURL}/app/${app.value.id}`,
    image: fullImageURL,
    screenshot: fullImageURL,
    ...(app.value.features?.length
      ? { featureList: app.value.features.map(f => f.title) }
      : {}),
    ...(app.value.developer
      ? { author: { "@type": "Organization", "name": app.value.developer } }
      : {}),
    offers: {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    aggregateRating: {
      bestRating: 5,
      ratingValue: 5,
      ratingCount: 1,
    },
  }),
  ...(app.value.faq?.length
    ? [{
        "@type": "FAQPage",
        "mainEntity": app.value.faq.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer,
          },
        })),
      } as never]
    : []),
]);

const config = computed(() => {
  const rows: { key: string; value: string }[] = [
    { key: "Name", value: app.value?.name || "-" },
    { key: "Website", value: app.value?.url || "-" },
  ];
  if (app.value?.developer) rows.push({ key: "Developer", value: app.value.developer });
  if (app.value?.category) rows.push({ key: "Category", value: app.value.category });
  if (app.value?.pricing) rows.push({ key: "Pricing", value: app.value.pricing });
  if (app.value?.platforms?.length) rows.push({ key: "Platforms", value: app.value.platforms.join(", ") });
  rows.push({ key: "Tags", value: app.value?.tags?.join(", ") || "-" });
  return rows;
});
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
            data-umami-event="Install verified app"
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
        :alt="`Screenshot of ${app.name}`"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1216px"
        :img-attrs="{ class: 'w-full border border-gray-300 dark:border-gray-700 aspect-card-img bg-gray-50 overflow-hidden rounded-lg sm:rounded-xl' }"
      />

      <section
        v-if="app.longDescription"
        class="my-8"
      >
        <h2 class="font-title mb-3 text-2xl font-bold sm:text-3xl">
          About {{ app.name }}
        </h2>
        <div class="space-y-3 text-base leading-relaxed text-gray-700 dark:text-gray-300">
          <p
            v-for="(paragraph, idx) in app.longDescription.split(/\n\n+/)"
            :key="idx"
          >
            {{ paragraph }}
          </p>
        </div>
      </section>

      <section
        v-if="app.features?.length"
        class="my-8"
      >
        <h2 class="font-title mb-4 text-2xl font-bold sm:text-3xl">
          Key features
        </h2>
        <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <li
            v-for="feature in app.features"
            :key="feature.title"
            class="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40"
          >
            <p class="font-semibold text-gray-900 dark:text-white">
              {{ feature.title }}
            </p>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {{ feature.description }}
            </p>
          </li>
        </ul>
      </section>

      <section
        v-if="app.useCases?.length"
        class="my-8"
      >
        <h2 class="font-title mb-3 text-2xl font-bold sm:text-3xl">
          Common use cases
        </h2>
        <ul class="list-disc space-y-1 pl-6 text-gray-700 dark:text-gray-300">
          <li
            v-for="useCase in app.useCases"
            :key="useCase"
          >
            {{ useCase }}
          </li>
        </ul>
      </section>

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
              data-umami-event="Check verified app"
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

      <section
        v-if="app.faq?.length"
        class="my-10"
      >
        <h2 class="font-title mb-4 text-2xl font-bold sm:text-3xl">
          Frequently asked questions
        </h2>
        <div class="space-y-3">
          <details
            v-for="item in app.faq"
            :key="item.question"
            class="group rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900/40"
          >
            <summary class="cursor-pointer list-none font-semibold text-gray-900 marker:hidden dark:text-white">
              <span class="inline-flex w-full items-center justify-between gap-2">
                <span>{{ item.question }}</span>
                <Icon
                  name="material-symbols:expand-more-rounded"
                  class="size-5 transition-transform group-open:rotate-180"
                />
              </span>
            </summary>
            <p class="mt-2 text-gray-700 dark:text-gray-300">
              {{ item.answer }}
            </p>
          </details>
        </div>
      </section>

      <div class="mt-20 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <UButton
          size="xl"
          :ui="{ rounded: 'rounded-full' }"
          variant="outline"
          target="_blank"
          label="Edit this page"
          leading-icon="simple-icons:github"
          external
          rel="nofollow"
          :to="`https://github.com/mathix420/free-the-web-apps/tree/master/content/${app._file}`"
        />
      </div>
    </UContainer>
  </main>
</template>
