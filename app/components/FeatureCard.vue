<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  icon: string;
}>();
</script>

<template>
  <UCard
    class="w-full md:w-[350px] lg:w-[450px] xl:w-[392px] text-primary-600 dark:text-white"
    :ui="{
      background: 'bg-primary-600/5 dark:bg-primary-400/5',
      ring: '',
    }"
  >
    <Icon
      class="size-8 mb-2"
      :name="icon"
    />
    <p class="font-bold">
      {{ title }}
    </p>
    <p class="text-primary-500 dark:text-gray-400 mt-1">
      {{ description }}
    </p>
  </UCard>
</template>
