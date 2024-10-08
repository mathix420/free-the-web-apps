<script setup lang="ts">
import { version as packageVersion } from "../../package.json";

interface Browser {
  value: string;
  label: string;
  defaultExecutablePath: Record<string, string | null>;
  icon: string;
  disabled?: boolean;
}

interface OperatingSystem {
  value: string;
  label: string;
  icon: string;
  disabled?: boolean;
}

const operatingSystems: OperatingSystem[] = [{
  value: "linux",
  label: "Linux",
  icon: "simple-icons:linux",
}, {
  disabled: true,
  value: "windows",
  label: "Windows (to be implemented)",
  icon: "simple-icons:windows",
}, {
  disabled: true,
  value: "macos",
  label: "macOS (to be implemented)",
  icon: "simple-icons:apple",
}];
const browsers: Browser[] = [{
  value: "chrome",
  label: "Chrome",
  defaultExecutablePath: {
    linux: "/usr/bin/google-chrome-stable",
    macos: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    windows: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  },
  icon: "simple-icons:googlechrome",
}, {
  value: "brave",
  label: "Brave",
  defaultExecutablePath: {
    linux: "/usr/bin/brave",
    macos: "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    windows: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  },
  icon: "simple-icons:brave",
}, {
  value: "edge",
  label: "Edge",
  defaultExecutablePath: {
    linux: "/usr/bin/microsoft-edge",
    macos: "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    windows: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  },
  icon: "simple-icons:microsoftedge",
}, {
  disabled: true,
  value: "firefox",
  label: "Firefox (to be implemented)",
  defaultExecutablePath: {
    linux: "/usr/bin/firefox",
    macos: "/Applications/Firefox.app/Contents/MacOS/firefox",
    windows: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
  },
  icon: "simple-icons:firefox",
}, {
  disabled: true,
  value: "safari",
  label: "Safari (to be implemented)",
  defaultExecutablePath: {
    linux: null,
    macos: "/Applications/Safari.app/Contents/MacOS/Safari",
    windows: null,
  },
  icon: "simple-icons:safari",
}];

const { remoteUrl } = useRuntimeConfig().public;

// TODO: detect browser and OS from user agent (or client hints)
const browser = ref(browsers[0]);
const operatingSystem = ref(operatingSystems[0]);
const executablePath = ref("");

const autofillLoading = ref(false);
const webAppInfos = ref({
  url: "",
  name: "",
  logo: "",
});

// TODO: expert mode
// const expertMode = ref(false);

const urlRegex = /^((https?):\/\/)?[^\s/$.?#]+\.[^\s]{2,}$/;
const validUrl = computed(() => urlRegex.test(webAppInfos.value.url));
const validLogo = computed(() => urlRegex.test(webAppInfos.value.logo));

const execCode = computed(() => `sh -c "$(curl -fsSL ${remoteUrl}/x/123)"`);

watchEffect(() => {
  if (browser.value?.defaultExecutablePath && operatingSystem.value?.value && operatingSystem.value.value in browser.value.defaultExecutablePath) {
    executablePath.value = browser.value.defaultExecutablePath[operatingSystem.value.value] as string;
  }
});

async function autofillInfos() {
  if (webAppInfos.value.url) {
    autofillLoading.value = true;
    const { data } = await useFetch(`/api/website`, {
      retry: 0,
      dedupe: "cancel",
      query: { url: webAppInfos.value.url.startsWith("http") ? webAppInfos.value.url : `https://${webAppInfos.value.url}` },
    });
    if (data) {
      webAppInfos.value.name = data.value?.name || webAppInfos.value.name;
      webAppInfos.value.logo = data.value?.icon || webAppInfos.value.logo;
    }
    autofillLoading.value = false;
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <!-- <div class="flex flex-wrap gap-3 justify-between"> -->
      <h2 class="text-xl font-semibold">
        Web App Unchainer v{{ packageVersion }}
      </h2>

      <!-- TODO: expert mode -->
      <!-- <UFormGroup
                label="Expert Mode"
                class="flex items-center gap-2 select-none"
              >
                <UToggle
                  v-model="expertMode"
                />
              </UFormGroup> -->
      <!-- </div> -->
    </template>

    <div class="flex flex-col gap-4">
      <UAccordion
        variant="link"
        :items="[{
          label: `For ${browser?.label} on ${operatingSystem?.label}`,
          icon: 'heroicons:cog-6-tooth',
        }]"
      >
        <template #item>
          <div class="flex flex-col gap-4">
            <USelectMenu
              v-model="browser"
              :icon="browser?.icon"
              :options="browsers"
            />
            <USelectMenu
              v-model="operatingSystem"
              :icon="operatingSystem?.icon"
              :options="operatingSystems"
            />
            <UInput
              v-model="executablePath"
              :placeholder="`Path to ${browser?.label} executable`"
            />
          </div>
        </template>
      </UAccordion>

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
            :disabled="!webAppInfos.url || !executablePath"
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
        placeholder="Logo URL"
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
      />

      <UButton
        color="primary"
        :disabled="!webAppInfos.url || !executablePath"
        :label="`Unchain ${webAppInfos.name}!`"
        class="mt-3 justify-center font-bold"
      />
      <UInput
        readonly
        :model-value="execCode"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
            color="gray"
            variant="link"
            icon="material-symbols:content-copy-outline-rounded"
            :padded="false"
          />
        </template>
      </UInput>
    </div>
  </UCard>
</template>
