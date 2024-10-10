<template>
  <main>
    <AppHero />

    <UContainer>
      <h2
        id="free-my-web-app"
        class="uppercase py-10 font-title text-center font-black text-3xl sm:text-4xl"
      >
        It's your turn
      </h2>
      <AppUnchainer class="mb-28" />

      <h2
        id="gallery"
        class="uppercase py-10 font-title text-center font-black text-3xl sm:text-4xl"
      >
        App gallery
      </h2>
      <AppGallery />

      <!-- Suggest an app -->
      <div class="flex justify-center mt-20">
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
