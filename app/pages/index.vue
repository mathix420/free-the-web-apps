<script setup lang="ts">
import type { VerifiedWebsiteContent } from "~~/types";

const { data } = await useAsyncData("app-samples", () => queryContent<VerifiedWebsiteContent>().limit(12).find());
</script>

<template>
  <main>
    <AppHero />

    <UContainer>
      <h2
        id="why-ftwa"
        class="py-10 text-center font-title text-3xl font-black uppercase sm:text-4xl"
      >
        Why FTWA?
      </h2>

      <AppFeatures />

      <h2
        id="create-web-app"
        class="py-10 text-center font-title text-3xl font-black uppercase sm:text-4xl"
      >
        It's your turn
      </h2>
      <AppUnchainer class="mx-auto mb-28 md:max-w-[720px] lg:max-w-[920px] xl:max-w-none" />

      <h2
        id="gallery"
        class="py-10 text-center font-title text-3xl font-black uppercase sm:text-4xl"
      >
        App gallery
      </h2>
      <UCard
        :ui="{ body: { padding: 'sm:p-3 p-3' } }"
        class="mx-auto mb-5 max-w-[588px] xl:max-w-none"
      >
        <TargetSettings />
      </UCard>
      <AppGallery
        v-if="data"
        :websites="data"
      />

      <!-- Suggest an app -->
      <div class="mt-20 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <UButton
          size="xl"
          :ui="{ rounded: 'rounded-full' }"
          variant="outline"
          label="Visit App Store"
          leading-icon="heroicons:rectangle-stack"
          to="/store"
        />

        <p>OR</p>

        <UButton
          size="xl"
          :ui="{ rounded: 'rounded-full' }"
          variant="outline"
          target="_blank"
          label="Suggest an app"
          leading-icon="heroicons:plus-circle"
          external
          to="https://github.com/mathix420/free-the-web-apps/issues/new?assignees=&labels=app-suggestion&projects=&template=APP_SUGGESTION.yaml&title=%5BAPP%5D+-+"
        />
      </div>
    </UContainer>
  </main>
</template>
