<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
  <footer>
    <div class="mx-auto max-w-7xl p-6 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex justify-center gap-2 md:order-2">
        <UButton
          data-umami-event="Portfolio footer"
          icon="heroicons:globe-alt"
          target="_blank"
          :ui="{ rounded: 'rounded-xl' }"
          color="gray"
          aria-label="Personnal Portfolio"
          to="https://mathix.dev"
          variant="ghost"
        />
        <UButton
          data-umami-event="Github link footer"
          icon="simple-icons:github"
          target="_blank"
          :ui="{ rounded: 'rounded-xl' }"
          color="gray"
          aria-label="View source code"
          to="https://github.com/mathix420/free-the-web-apps?utm_source=ftwa.mathix.dev&utm_medium=footer-btn"
          variant="ghost"
        />
        <ClientOnly>
          <UButton
            data-umami-event="Change theme"
            :icon="colorMode.value === 'dark' ? 'heroicons:moon-20-solid' : 'heroicons:sun-20-solid'"
            color="gray"
            :ui="{ rounded: 'rounded-xl' }"
            variant="ghost"
            aria-label="Theme"
            @click="colorMode.value === 'light' ? colorMode.value = 'dark' : colorMode.value = 'light'"
          />
          <template #fallback>
            <div class="size-8" />
          </template>
        </ClientOnly>
      </div>
      <div class="mt-4 md:order-1 md:mt-0">
        <p class="text-center text-xs text-gray-500 md:text-left">
          Made by
          <NuxtLink
            target="_blank"
            data-umami-event="Portfolio footer"
            to="https://mathix.dev"
          >
            Arnaud Gissinger
          </NuxtLink>
          using
          <NuxtLink
            target="_blank"
            data-umami-event="Stack link footer"
            to="https://ui.nuxt.com/"
          >
            Nuxt UI</NuxtLink>,
          <NuxtLink
            target="_blank"
            data-umami-event="Stack link footer"
            to="https://tailwindui.com/"
          >
            Tailwind UI
          </NuxtLink>
          and deployed with
          <NuxtLink
            target="_blank"
            data-umami-event="Stack link footer"
            to="https://hub.nuxt.com/"
          >
            Nuxt Hub</NuxtLink>.
        </p>
      </div>
    </div>
  </footer>
</template>
