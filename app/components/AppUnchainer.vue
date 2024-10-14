<script setup lang="ts">
import type { SubmitWebsite, TargetInfos } from "~~/types";

const { remoteUrl } = useRuntimeConfig().public;
const targetInfos = useState<TargetInfos>("target-infos");

const autofillLoading = ref(false);
const submitLoading = ref(false);
const execCode = ref("");
const websiteId = ref("");
const webAppInfos = ref({
  url: "",
  name: "",
  logo: "",
  logoSize: 0,
} as SubmitWebsite);

const urlRegex = /^((https?):\/\/)?[^\s/$.?#]+\.[^\s]{2,}$/;
const validUrl = computed(() => urlRegex.test(webAppInfos.value.url));
const validLogo = computed(() => urlRegex.test(webAppInfos.value.logo));

const prefixedUrl = computed(() => webAppInfos.value.url.startsWith("http") ? webAppInfos.value.url : `https://${webAppInfos.value.url}`);

async function autofillInfos() {
  if (validUrl.value) {
    autofillLoading.value = true;
    const { data } = await useFetch(`/api/website`, {
      retry: 0,
      dedupe: "cancel",
      query: { url: prefixedUrl.value },
    });
    if (data.value) {
      if (data.value?.icon && data.value?.icon !== webAppInfos.value.logo) {
        webAppInfos.value.logoSize = 0;
      }
      webAppInfos.value.name = data.value?.name || webAppInfos.value.name;
      webAppInfos.value.logo = data.value?.icon || webAppInfos.value.logo;
    }
    autofillLoading.value = false;
  }
}

async function submitWebsite() {
  if (validUrl.value && validLogo.value) {
    submitLoading.value = true;
    const { data } = await useFetch(`/api/submit`, {
      method: "POST",
      retry: 0,
      dedupe: "cancel",
      body: {
        ...webAppInfos.value,
        url: prefixedUrl.value,
      },
    });
    if (data.value?.uid) {
      websiteId.value = data.value.uid;
      execCode.value = `sh -ec "$(curl -fsSL '${remoteUrl}/u/${data.value?.uid}`
      + `?os=${targetInfos.value.os}`
      + `&bw=${targetInfos.value.bw}`
      + `&path=${encodeURIComponent(targetInfos.value.path)}')"`;
    }
    submitLoading.value = false;
  }
}

const { copy } = useCopyToClipboard();
function copyCode() {
  copy(execCode.value, { title: "Command copied!", description: "Paste in terminal to install the app." }, { title: "Failed to copy!" });
}
</script>

<template>
  <UCard>
    <div class="flex flex-col gap-4">
      <TargetSettings />

      <UInput
        v-model="webAppInfos.url"
        leading-icon="heroicons:link"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        placeholder="Web App URL"
      >
        <template
          v-if="validUrl"
          #trailing
        >
          <UButton

            variant="link"
            :disabled="!webAppInfos.url || !targetInfos.path"
            aria-label="Auto-detect infos"
            :padded="false"
            :loading="autofillLoading"
            leading-icon="heroicons:sparkles"
            @click="autofillInfos"
          />
        </template>
      </UInput>

      <UInput
        v-model="webAppInfos.name"
        leading-icon="heroicons:tag"
        placeholder="Name"
      />

      <!-- Enable cursor -->
      <UInput
        v-model="webAppInfos.logo"
        leading-icon="heroicons:photo"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        placeholder="PNG Logo URL"
        @update:model-value="webAppInfos.logoSize = 0"
      >
        <template
          v-if="webAppInfos.name"
          #trailing
        >
          <UButton
            variant="link"
            aria-label="Search logo"
            :padded="false"
            icon="heroicons:magnifying-glass"
            :to="`https://www.google.com/search?imgsz=i&udm=2&as_q=${webAppInfos.name} logo`"
            target="_blank"
          />
        </template>
      </UInput>

      <img
        v-if="validLogo"
        :src="webAppInfos.logo"
        alt="Logo"
        width="64"
        height="64"
        class="mx-auto"
        @load="webAppInfos.logoSize = $event?.target?.naturalWidth || 0"
      />

      <!-- Hints -->
      <template v-if="webAppInfos.url">
        <p v-if="!validUrl">
          Invalid Web App URL.
        </p>
        <p v-else-if="!webAppInfos.name">
          Missing a name.
        </p>
        <p v-else-if="!webAppInfos.logo">
          Missing PNG logo.
        </p>
        <p v-else-if="!validLogo">
          Invalid logo URL.
        </p>
        <p v-else-if="webAppInfos.logoSize === 0">
          Invalid logo.
        </p>
        <p v-else-if="webAppInfos.logoSize < 1024 && targetInfos.os === 'macos'">
          Logo needs to be at least 1024px for macOS.
        </p>
        <p v-else-if="!webAppInfos.logo.includes('.png')">
          Make sure your image a PNG.
        </p>
      </template>

      <UButton
        v-show="validUrl && validLogo && webAppInfos.logoSize !== 0 && webAppInfos.name"
        data-umami-event="Free a web app"
        color="primary"
        :label="`Free ${webAppInfos.name}!`"
        class="mt-3 justify-center font-bold"
        :loading="submitLoading"
        @click="submitWebsite"
      />

      <UFormGroup
        v-if="execCode"
        class="mt-5"
        size="xl"
        label="Run this in your terminal:"
        help="It's good practice to check a script before running it."
      >
        <template #hint>
          <UButton
            data-umami-event="Check code link"
            variant="link"
            label="Check"
            icon="material-symbols:open-in-new"
            :padded="false"
            target="_blank"
            :to="`/u/${websiteId}?os=${targetInfos.os}&bw=${targetInfos.bw}&path=${encodeURIComponent(targetInfos.path)}`"
          />
        </template>

        <UInput
          readonly
          data-umami-event="Copy custom code"
          :model-value="execCode"
          :ui="{ icon: { trailing: { pointer: '' } } }"
          @focus="$event.target.select()"
          @click="copyCode"
        >
          <template #trailing>
            <UButton
              color="gray"
              data-umami-event="Copy custom code"
              variant="link"
              icon="material-symbols:content-copy-outline-rounded"
              :padded="false"
              @click="copyCode"
            />
          </template>
        </UInput>
      </UFormGroup>
    </div>
  </UCard>
</template>
