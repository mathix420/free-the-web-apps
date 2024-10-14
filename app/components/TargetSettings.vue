<script setup lang="ts">
import { browsers, operatingSystems } from "~/settings";
import type { TargetInfos } from "~~/types";

const targetInfos = useState<TargetInfos>("target-infos", () => ({
  bw: "chrome",
  os: "linux",
  path: "",
}));

const browser = computed(() => browsers.find(b => b.value === targetInfos.value.bw));
const operatingSystem = computed(() => operatingSystems.find(os => os.value === targetInfos.value.os));
const defaultExecutablePath = computed(() => browser.value?.defaultExecutablePath?.[targetInfos.value?.os]);

watchEffect(() => {
  if (defaultExecutablePath.value) {
    targetInfos.value.path = defaultExecutablePath.value || targetInfos.value.path;
  }
});
</script>

<template>
  <UAccordion
    data-umami-event="Target Settings"
    variant="link"
    :ui="{
      default: {
        class: 'mb-0 w-full',
      },
    }"
    :items="[{
      label: `For ${browser?.label} on ${operatingSystem?.label}`,
      icon: 'heroicons:cog-6-tooth',
    }]"
  >
    <template #item>
      <div class="flex flex-col gap-4">
        <USelectMenu
          v-model="targetInfos.bw"
          value-attribute="value"
          :icon="browser?.icon"
          :options="browsers"
        />
        <USelectMenu
          v-model="targetInfos.os"
          value-attribute="value"
          :icon="operatingSystem?.icon"
          :options="operatingSystems"
        />
        <UInput
          v-model="targetInfos.path"
          :placeholder="`Path to ${browser?.label} executable`"
        />
      </div>
    </template>
  </UAccordion>
</template>
