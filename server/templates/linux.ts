import userChromeCss from "./files/userChrome.css";
import userJs from "./files/user.js.txt";
import type { TargetInfos, WebsiteType } from "~~/types";

function firefoxSetup(target: TargetInfos) {
  if (target.bw !== "firefox") return "# Firefox setup skipped";

  return `echo "\nSetting up Firefox...";
# create FTWA profile
${escapePath(target.path)} -CreateProfile FTWA;

# locate the profile folder
profile_folder=$(find ~/.mozilla/firefox -maxdepth 1 -type d -name "*.FTWA");

# create userChrome.css
mkdir -p "$profile_folder/chrome"
cat <<EOF > "$profile_folder/chrome/userChrome.css"
${userChromeCss}
EOF

# create user.js
cat <<EOF > "$profile_folder/user.js"
${userJs}
EOF

echo "Firefox setup done.";`;
}

export function linux({
  website,
  target,
}: {
  website: WebsiteType;
  target: TargetInfos;
}) {
  const fname = "ftwa-" + website?.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  let commandOpts = "";

  if (target.bw === "firefox") {
    commandOpts = `--name='${website.name}' --no-remote -P "FTWA" '${website.url}'`;
  }
  else if (["chrome", "opera", "brave", "edge"].includes(target.bw)) {
    commandOpts = `--app='${website.url}'`;
  }

  return `# This script is generated by FTWA
# /u/ links are only available for 24h
# Check the app store to find more apps: https://ftwa.mathix.dev/store

# Exit on error
set -e;

# Setup Firefox if needed
${firefoxSetup(target)}

echo "\nCreating desktop entry...";
tmpdir="$(mktemp -d)";
tmp_desktop_file="$tmpdir/${fname}.desktop";

cat > $tmp_desktop_file <<EOF
[Desktop Entry]
Type=Application
Name=${website.name}
Exec=${escapePath(target.path)} ${commandOpts}
Icon=${fname}
Terminal=false
StartupNotify=true
StartupWMClass=${fname}

# This file was generated using FTWA (https://ftwa.mathix.dev)
EOF

icon_path="$tmpdir/${fname}.png";
curl -fsSLo $icon_path '${website.logo}';

xdg-desktop-menu install $tmp_desktop_file;
xdg-icon-resource install --size ${website.logoSize} "\${tmpdir}/${fname}.png" '${fname}';

echo "Desktop entry created.";`;
};
