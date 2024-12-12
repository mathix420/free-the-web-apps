<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  icon: string;
}>();
</script>

<template>
  <UCard
    class="w-full text-primary-600 dark:text-white md:w-[350px] lg:w-[450px] xl:w-[392px]"
    :ui="{
      background: 'bg-primary-600/5 dark:bg-primary-400/5',
      ring: '',
    }"
  >
    <Icon
      class="mb-2 size-8"
      :name="icon"
    />
    <p class="font-bold">
      {{ title }}
    </p>
    <p class="mt-1 text-primary-500 dark:text-gray-400">
      {{ description }}
    </p>
  </UCard>
</template>
