<script setup lang="ts">
import type { Browser, OS, SubmitWebsite, TargetInfos } from "~~/types";

interface TBrowser {
  value: Browser;
  label: string;
  defaultExecutablePath: Record<string, string | null>;
  icon: string;
  disabled?: boolean;
}

interface OperatingSystem {
  value: OS;
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
const browsers: TBrowser[] = [{
  value: "chrome",
  label: "Chrome",
  defaultExecutablePath: {
    linux: "$(which google-chrome-stable)",
    macos: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    windows: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  },
  icon: "simple-icons:googlechrome",
}, {
  value: "brave",
  label: "Brave",
  defaultExecutablePath: {
    linux: "$(which brave)",
    macos: "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    windows: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  },
  icon: "simple-icons:brave",
}, {
  value: "edge",
  label: "Edge",
  defaultExecutablePath: {
    linux: "$(which microsoft-edge)",
    macos: "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    windows: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  },
  icon: "simple-icons:microsoftedge",
}, {
  disabled: true,
  value: "firefox",
  label: "Firefox (to be implemented)",
  defaultExecutablePath: {
    linux: "$(which firefox)",
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

const targetInfos = useState<TargetInfos>("target-infos", () => ({
  bw: browser.value?.value || "chrome",
  os: operatingSystem.value?.value || "linux",
  path: executablePath.value || "",
}));
watchEffect(() => {
  targetInfos.value.bw = browser.value?.value || targetInfos.value.bw;
  targetInfos.value.os = operatingSystem.value?.value || targetInfos.value.os;
  targetInfos.value.path = executablePath.value || targetInfos.value.path;
});

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

watchEffect(() => {
  if (browser.value?.defaultExecutablePath && operatingSystem.value?.value && operatingSystem.value.value in browser.value.defaultExecutablePath) {
    executablePath.value = browser.value.defaultExecutablePath[operatingSystem.value.value] as string;
  }
});

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
      execCode.value = `sh -c "$(curl -fsSL '${remoteUrl}/u/${data.value?.uid}`
      + `?os=${targetInfos.value.os}`
      + `&bw=${targetInfos.value.bw}`
      + `&path=${encodeURIComponent(targetInfos.value.path)}')"`;
    }
    submitLoading.value = false;
  }
}

const { copy } = useCopyToClipboard();
function copyCode() {
  copy(execCode.value, { title: "Copied!" }, { title: "Failed!" });
}
</script>

<template>
  <UCard>
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
        <p v-else-if="!webAppInfos.logo.includes('.png')">
          Make sure your image a PNG.
        </p>
        <p v-else-if="webAppInfos.logoSize === 0">
          Invalid logo.
        </p>
      </template>

      <UButton
        v-show="validUrl && validLogo && webAppInfos.logoSize !== 0 && webAppInfos.name"
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
            variant="link"
            label="Check"
            icon="material-symbols:open-in-new"
            :padded="false"
            target="_blank"
            :to="`/u/${websiteId}?os=${operatingSystem?.value}&bw=${browser?.value}&path=${encodeURIComponent(executablePath)}`"
          />
        </template>

        <UInput
          readonly
          :model-value="execCode"
          :ui="{ icon: { trailing: { pointer: '' } } }"
          @focus="$event.target.select()"
          @click="copyCode"
        >
          <template #trailing>
            <UButton
              color="gray"
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
