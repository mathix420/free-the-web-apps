<a href="https://ftwa.mathix.dev" target="_blank" align="center"><img alt="FTWA Screenshot" src="public/og.png"></a>

# Free The Web Apps

**[FTWA](https://ftwa.mathix.dev)** is an utility to free your web apps from their browser's frame.
So you don't need to wait for Arc Browser on Linux to have great looking webapps!

- **Native Feel.** Don't wait for native desktop apps, most frontend developpers already did an amazing job.
- **Quick Access.** Find your apps in the App Launcher, Rofi, Wofi, dmenu, Spotlight and more.
- **Support Extentions.** Apps keep browser data: cookies, storage, extentions, ...
- **App Store.** Discover dozen of web apps that work especially well in a frameless browser.

**[Apps Store](https://ftwa.mathix.dev/store)** • **[How it works](#how-it-works)** • **[Suggest an app][suggest-app]**

> [!NOTE]
> Feel free to contribute and [suggest apps][suggest-app] you find useful!

## How it works

### Chromium browsers

FTWA uses the `--app='https://app.example'` parameter with Chromium-based browsers to launch a website in "app mode". Similar to kiosk-mode, this mode launches the website without the typical browser interface, such as tabs, the address bar, or navigation buttons, making the website look and feel more like a standalone application.

### Firefox

Previously the `--ssb` parameter (Site Specific Browser) provided similar behavior as `--app` in chrome, but it was discontinued in 2021.
FTWA create a new firefox profile with custom CSS and settings, inspired by [this reddit comment](https://www.reddit.com/r/firefox/comments/li2lqg/now_that_mozilla_killed_the_ssb_feature_what/).

### On linux

When choosing linux as target OS, FTWA generate a shell script that will create a [`.desktop` file](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html) and it's icons.

### On Windows

TODO: Not implemented yet. But will use shortcuts.

### On Macos

Creating a `.app` folder in `/Applications` containing an icon (`.icns`) and a bash script that run the browser command.

## How to install an app

1. Make sure to select your environment options.

    ![settings](.github/assets/settings.png)
2. Either [create your own app](https://ftwa.mathix.dev/#create-web-app) or click the copy icon on any app from the [gallery](https://ftwa.mathix.dev/#gallery) or [app store](https://ftwa.mathix.dev/store).
3. Paste the code in your terminal of choice.
    - It's good practice to check a script content before running it.
    - **Example:**
      ```bash
      sh -ec "$(curl -fsSL 'https://ftwa.mathix.dev/v/excalidraw?os=linux&bw=chrome&path=%2Fusr%2Fbin%2Fgoogle-chrome-stable')"
      ```
      Just curl the link or [open it in a browser](https://ftwa.mathix.dev/v/excalidraw?os=linux&bw=chrome&path=%2Fusr%2Fbin%2Fgoogle-chrome-stable) to see the script content.
      ```bash
      curl -fsSL 'https://ftwa.mathix.dev/v/excalidraw?os=linux&bw=chrome&path=%2Fusr%2Fbin%2Fgoogle-chrome-stable'
      ```

Currently this will only work if you have a chromium browser installed. If you're not using `google-chrome` make sure to either edit the `.desktop` file to point to your executable, or make `/usr/bin/google-chrome` an alias to your chromium browser.

## What to expect using swayfx

Using [swayfx](https://github.com/WillPower3309/swayfx) as window manager (corner_radius: 12, blur_radius: 5)

- Chrome, Todo Mate, YT Music (My current every-day setup)
  ![image](https://github.com/mathix420/free-the-web-apps/assets/37625778/a286d765-7bda-4a06-8c20-4d3aec129d0a)

- YouTube Music, Todo Mate, Notion
  ![image](https://github.com/mathix420/free-the-web-apps/assets/37625778/65fd1f2c-beb8-4e8f-a133-6acd5feae10f)

- YouTube Music
  ![image](https://github.com/mathix420/free-the-web-apps/assets/37625778/376aa8a6-577e-47be-a94e-471230b1706a)

- Notion, ~~Cron~~ *Notion* Calendar
  ![image](https://github.com/mathix420/free-the-web-apps/assets/37625778/d04f03fb-254b-4216-8ee0-66574e75abc8)

## How to uninstall

### Linux

Installed apps are located in one of these locations, just remove the ftwa-*.desktop file you don't want anymore.

```bash
ls -lAh ~/.local/share/applications
# OR
ls -lAh /usr/share/applications
```

### Macos

You can uninstall apps like any other one, just move the `.app` folder to the trash.

## Ressources to find logos

- https://macosicons.com/
- https://icon-icons.com/
- https://simpleicons.org/

## Web Dev

Look at [Nuxt docs](https://nuxt.com/docs/getting-started/introduction), [Nuxt UI](https://ui.nuxt.com), [Nuxt Hub](https://hub.nuxt.com) and [Tailwind UI](https://tailwindui.com/) to learn more.

### Setup

Make sure to install the dependencies:

```bash
bun install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
bun run dev
# or
bun run dev --host
```

### Production

Build the application for production:

```bash
bun run build
```

Locally preview production build:

```bash
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


[suggest-app]: https://github.com/mathix420/free-the-web-apps/issues/new?assignees=&labels=app-suggestion&projects=&template=APP_SUGGESTION.yaml&title=%5BAPP%5D+-+