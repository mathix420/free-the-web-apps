# Free the web apps

Collection of [`.desktop` files](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html) allowing you to finally use web apps the way they were designed to be used.

So you don't need to wait for Arc Browser on Linux to have great looking webapps!

[Check the gallery!](#gallery)

> [!NOTE]
> Feel free to contribute and add web apps you find useful in this situation.

## How to install

Currently this will only work if you have a chromium browser installed. If you're not using `google-chrome` make sure to either edit the `.desktop` file to point to your executable, or make `google-chrome` an alias to your chromium browser.

### Using the util

> [!IMPORTANT]
> Rembember to always have a look at scripts before executing with sudo!

```bash
curl -s https://ftwa.pulsar.dev/install.sh | sudo bash -s APP_NAME
```

Get the app list [here](/apps).

### Manually

1. Clone the repo
2. Copy the `.desktop` file to `/usr/share/applications`
3. Copy the `.png` file to `/usr/share/pixmaps`
4. Eventually you can update the `.desktop` file to run with another chrome executable

<!-- TODO: -->
<!-- ```bash
curl https://mathix.ninja/ftwa.sh | sudo bash
```

Will launch this CLI
```bash
Which web app would you like to install?
> todomate

DONE!
``` -->

## Gallery

Using [swayfx](https://github.com/WillPower3309/swayfx) as window manager (corner_radius: 12, blur_radius: 5)

- YouTube Music, Todo Mate, Notion
  ![image](https://github.com/mathix420/free-the-web-apps/assets/37625778/65fd1f2c-beb8-4e8f-a133-6acd5feae10f)

- YouTube Music
  ![image](https://github.com/mathix420/free-the-web-apps/assets/37625778/376aa8a6-577e-47be-a94e-471230b1706a)

- Notion, ~~Cron~~ *Notion* Calendar
  ![image](https://github.com/mathix420/free-the-web-apps/assets/37625778/d04f03fb-254b-4216-8ee0-66574e75abc8)
