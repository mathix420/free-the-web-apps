<script setup lang="ts">
import { version as packageVersion } from "../package.json";

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
  disabled: true,
  value: "edge",
  label: "Edge (to be implemented)",
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

// TODO: detect browser and OS from user agent (or client hints)
const browser = ref(browsers[0]);
const operatingSystem = ref(operatingSystems[0]);
const executablePath = ref("");

watchEffect(() => {
  if (browser.value?.defaultExecutablePath && operatingSystem.value?.value && operatingSystem.value.value in browser.value.defaultExecutablePath) {
    executablePath.value = browser.value.defaultExecutablePath[operatingSystem.value.value] as string;
  }
});

useHead({
  title: "FTWA - Free The Web Apps",
  meta: [
    {
      name: "description",
      content: "Free the web apps from your browser's frame, because they deserve it.",
    },
    {
      name: "theme-color",
      media: "(prefers-color-scheme: dark)",
      content: "#24182d",
    },
    {
      name: "theme-color",
      media: "(prefers-color-scheme: light)",
      content: "#fdfaff",
    },
  ],
});
</script>

<template>
  <Html lang="en-US">
    <Body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white pb-36">
      <AppHero />

      <UContainer>
        <UCard>
          <template #header>
            <div class="flex justify-between">
              <h2>Web App Unchainer v{{ packageVersion }}</h2>
              <ColorScheme>
                <USelect
                  v-model="$colorMode.preference"
                  :options="['system', 'light', 'dark']"
                />
              </ColorScheme>
            </div>
          </template>

          <div class="flex flex-col gap-4">
            <USelectMenu
              v-model="browser"
              size="lg"
              :icon="browser?.icon"
              :options="browsers"
            />
            <USelectMenu
              v-model="operatingSystem"
              size="lg"
              :icon="operatingSystem?.icon"
              :options="operatingSystems"
            />
            <UInput
              v-model="executablePath"
              size="lg"
              :placeholder="`Path to ${browser?.label} executable`"
            />

            <UButton
              icon="i-heroicons-book-open"
              to="https://ui.nuxt.com"
              target="_blank"
            >
              Open Nuxt UI Documentation
            </UButton>
          </div>
        </UCard>
      </UContainer>
    </Body>
  </Html>
</template>
