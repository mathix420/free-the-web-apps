<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <header class="sticky inset-x-0 top-0 z-10 flex items-center justify-center border-b border-black/5 bg-white/30 backdrop-blur dark:border-white/5 dark:bg-black/30">
    <div class="flex w-full max-w-7xl items-center gap-1 px-4 py-3 sm:px-6 lg:px-8">
      <NuxtLink
        class="group mr-auto flex shrink items-center gap-3 overflow-hidden"
        to="/"
      >
        <NuxtImg
          src="/android-chrome-512x512.png"
          alt="FTWA Logo"
          width="40"
          height="40"
          class="mx-auto size-7 rounded-[8px] shadow sm:size-10 sm:rounded-[11px]"
        />
        <p
          class="whitespace-nowrap text-center font-title text-xl font-black uppercase italic sm:text-2xl"
        >
          FTWA <span class="opacity-60 transition-opacity group-hover:opacity-80">/ {{ title }}</span>
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
        rel="nofollow"
        to="https://github.com/mathix420/free-the-web-apps?utm_source=ftwa-header"
        target="_blank"
      />
    </div>
  </header>
</template>
