<script setup lang="ts">
import type { Browser, OS, TargetInfos } from "~~/types";

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
  value: "macos",
  label: "macOS 🚨 ALPHA! 🚨",
  icon: "simple-icons:apple",
}];
const browsers: TBrowser[] = [{
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
  value: "opera",
  label: "Opera",
  defaultExecutablePath: {
    linux: "/usr/bin/opera",
    macos: "/Applications/Opera.app/Contents/MacOS/Opera",
    windows: "C:\\Program Files\\Opera\\launcher.exe",
  },
  icon: "simple-icons:opera",
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

// TODO: detect browser and OS from user agent (or client hints)
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
