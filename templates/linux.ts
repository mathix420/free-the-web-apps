import type { TargetInfos, WebsiteType } from "~~/types";

export function linux({
  website,
  target,
}: {
  website: WebsiteType;
  target: TargetInfos;
}) {
  const fname = "ftwa-" + website?.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return `# This script is generated by FTWA
# /u/ links are only available for 24h
# Check the gallery to find more apps: https://ftwa.mathix.dev/#gallery

# Exit on error
set -e;

echo "\nCreating desktop entry...";
tmpdir="$(mktemp -d)";
tmp_desktop_file="$tmpdir/${fname}.desktop";

cat > $tmp_desktop_file <<EOF
[Desktop Entry]
Type=Application
Name=${website.name}
Exec=${target.path} --app='${website.url}'
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
