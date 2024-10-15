import type { Browser, OS } from "~~/types";

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

export const chromiumBrowsers = [
  "chrome",
  "brave",
  "edge",
  "opera",
];

export const operatingSystems: OperatingSystem[] = [{
  value: "linux",
  label: "Linux",
  icon: "simple-icons:linux",
}, {
  value: "macos",
  label: "macOS (BETA)",
  icon: "simple-icons:apple",
}, {
  disabled: true,
  value: "windows",
  label: "Windows (to be implemented)",
  icon: "simple-icons:windows",
}];

export const browsers: TBrowser[] = [{
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
  value: "firefox",
  label: "Firefox (BETA)",
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
