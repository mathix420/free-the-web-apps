<script setup lang="ts">
import type { VerifiedWebsiteContent } from "~~/types";

defineProps<{ websites: VerifiedWebsiteContent[] }>();
</script>

<template>
  <div class="flex flex-wrap justify-center gap-5 sm:gap-10">
    <WebsiteCard
      v-for="website in websites"
      :key="website.id"
      :website="website"
    />
  </div>
</template>
