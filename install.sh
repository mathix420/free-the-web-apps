#! /bin/bash

valid_choices="notion todomate youtube-music"

if [ $# -gt 1 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    echo "Usage: $0 {$(echo "$valid_choices" | tr ' ' '|')}"
    exit 1
fi

app_name="$1"

if [ $# -eq 0 ]; then
    clear
    echo -n "Which app would you like to install? "
fi

while [[ ! " $valid_choices " =~ " $app_name " ]]; do
    if [ "$app_name" != "" ]; then
        clear
        echo -e "Invalid app name: $app_name.\n"
    fi

    echo "Choose one of these apps:"
    echo "- $(echo "$valid_choices" | sed -e 's/ /\n- /g')"

    echo -ne "\n > "

    read -r app_name
done

echo ""

pixmap_path="/usr/share/pixmaps/$app_name.png"
app_path="/usr/share/applications/$app_name.desktop"

if [ -e "$pixmap_path" ]; then
    echo "File '$pixmap_path' already exists. Aborting."
    exit 1
fi

if [ -e "$app_path" ]; then
    echo "File '$app_path' already exists. Aborting."
    exit 1
fi

curl -s "https://raw.githubusercontent.com/mathix420/free-the-web-apps/master/apps/$app_name/$app_name.desktop" > "/tmp/$app_name.desktop"
curl -s "https://raw.githubusercontent.com/mathix420/free-the-web-apps/master/apps/$app_name/$app_name.png" > "/tmp/$app_name.png"

sudo cp "/tmp/$app_name.desktop" "$app_path"
sudo cp "/tmp/$app_name.png" "$pixmap_path"

rm -f "/tmp/$app_name.desktop"
rm -f "/tmp/$app_name.png"

echo "Done!"