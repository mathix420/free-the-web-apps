<script setup lang="ts">
import { NuxtLink } from "#components";

const id = useId();

const props = withDefaults(
  defineProps<{
    link?: boolean;
    button?: boolean;
    full?: boolean;
  }>(),
  {
    link: false,
    button: false,
    full: false,
  },
);

const kind = computed(() => {
  if (props.link) {
    return NuxtLink;
  }
  else if (props.button) {
    return "button";
  }
  return "div";
});
</script>

<template>
  <component
    :is="kind"
    to="/"
    :aria-labelledby="`title-label-${id}`"
    class="flex select-none flex-col font-title text-5xl font-black italic"
  >
    FTWA
    <span
      v-show="full"
      :id="`title-label-${id}`"
      class="text-base font-light opacity-80"
    >
      Free The Web Apps
    </span>
  </component>
</template>
