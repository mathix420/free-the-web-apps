#! /bin/bash

valid_choices="notion todomate youtube-music"

if [ $# -ne 1 ]; then
    echo "Usage: $0 {$(echo "$valid_choices" | tr ' ' '|')}"
    exit 1
fi

if [[ ! " $valid_choices " =~ " $1 " ]]; then
    echo -e "Invalid app name: $1.\n"
    echo "Please choose one of these:"
    echo "- $(echo "$valid_choices" | sed -e 's/ /\n- /g')"
    exit 1
fi

pixmap_path="/usr/share/pixmaps/$1.png"
app_path="/usr/share/applications/$1.desktop"

if [ -e "$pixmap_path" ]; then
    echo "File '$pixmap_path' already exists. Aborting."
    exit 1
fi

if [ -e "$app_path" ]; then
    echo "File '$app_path' already exists. Aborting."
    exit 1
fi

curl "https://raw.githubusercontent.com/mathix420/free-the-web-apps/master/apps/$1/$1.desktop" > /tmp/$1.desktop
curl "https://raw.githubusercontent.com/mathix420/free-the-web-apps/master/apps/$1/$1.png" > /tmp/$1.png

sudo cp /tmp/$1.desktop $app_path
sudo cp /tmp/$1.png $pixmap_path
