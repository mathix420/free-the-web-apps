<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <header class="flex sticky top-0 inset-x-0 z-10 backdrop-blur items-center justify-center border-b border-black/5 dark:border-white/5 bg-white/30 dark:bg-black/30">
    <div class="w-full px-4 gap-1 sm:px-6 lg:px-8 max-w-7xl flex py-3 items-center">
      <NuxtLink
        class="group flex-shrink overflow-hidden flex gap-3 items-center mr-auto"
        to="/"
      >
        <NuxtImg
          src="/android-chrome-512x512.png"
          alt="FTWA Logo"
          width="40"
          height="40"
          class="mx-auto size-7 sm:size-10 rounded-[8px] sm:rounded-[11px]"
        />
        <p
          class="font-title whitespace-nowrap italic text-xl sm:text-2xl text-center font-black uppercase"
        >
          FTWA <span class="opacity-60 group-hover:opacity-80 transition-opacity">/ {{ title }}</span>
        </p>
      </NuxtLink>

      <!-- <UButton
        variant="ghost"
        color="white"
        icon="heroicons:globe-alt"
        to="https://mathix.dev"
        target="_blank"
      /> -->
      <UButton
        variant="ghost"
        color="white"
        icon="simple-icons:github"
        to="https://github.com/mathix420/free-the-web-apps?utm_source=ftwa-header"
        target="_blank"
      />
    </div>
  </header>
</template>
