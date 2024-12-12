<script setup lang="ts">
import type { VerifiedWebsiteContent } from "~~/types";

defineProps<{ websites: VerifiedWebsiteContent[] }>();
</script>

<template>
  <div class="flex flex-wrap gap-5 sm:gap-10 justify-center">
    <WebsiteCard
      v-for="website in websites"
      :key="website.id"
      :website="website"
    />
  </div>
</template>
