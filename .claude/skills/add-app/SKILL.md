---
name: add-app
description: Add a new app to the Free The Web Apps catalog from a website URL. Extracts metadata, downloads icons, takes a screenshot using Chrome browser automation, and creates the JSON entry.
argument-hint: <url>
disable-model-invocation: true
---

# Add App to FTWA Catalog

Add a new web app to the Free The Web Apps catalog by extracting all needed information from the provided URL.

**URL:** $ARGUMENTS

## Available Tags

Use only tags from `tags.json`:

!`cat tags.json`

## Existing Apps

Don't create duplicates. Existing app IDs:

!`ls content/ | sed 's/\.json$//' | sed 's/^[0-9]*\.//'`

## Step-by-step Process

### 1. Navigate to the website

Use the Chrome browser automation tools to open the URL in a new tab:
- Call `mcp__claude-in-chrome__tabs_context_mcp` (with `createIfEmpty: true`) to get tab context
- Call `mcp__claude-in-chrome__tabs_create_mcp` to create a fresh tab
- Call `mcp__claude-in-chrome__navigate` to go to the URL

### 2. Extract metadata

Use `mcp__claude-in-chrome__get_page_text` or `mcp__claude-in-chrome__javascript_tool` to extract from the page:
- **Title** (from `<title>` or `og:title`)
- **Description** (from `<meta name="description">` or `og:description`)
- **Icon URLs** (from `<link rel="icon">`, `<link rel="apple-touch-icon">`, PWA manifest icons)
- **PWA manifest URL** (from `<link rel="manifest">`)

Then determine:
- **App ID**: Short, lowercase, hyphenated brand name (e.g., `github`, `chat-gpt`, `youtube-music`)
- **App Name**: Clean brand name only, proper capitalization, NO taglines (e.g., "GitHub" not "GitHub - Build and ship software")
- **Description**: Short, functional description of the app's purpose (max 100 chars)
- **Tags**: 2-4 relevant tags from the tags.json list above

### 3. Take a screenshot

The screenshot MUST be taken at specific dimensions. Follow this exact process:

1. First, resize the browser window to the correct dimensions:
   ```
   mcp__claude-in-chrome__resize_window with width=1428, height=960
   ```

2. Wait briefly for the page to reflow (`mcp__claude-in-chrome__computer` with `action: wait`, `duration: 2`)

3. Open Chrome DevTools:
   ```
   mcp__claude-in-chrome__computer with action: key, text: ctrl+shift+i
   ```

4. Open DevTools command palette:
   ```
   mcp__claude-in-chrome__computer with action: key, text: ctrl+shift+p
   ```

5. Type and execute the screenshot command:
   ```
   mcp__claude-in-chrome__computer with action: type, text: Capture screenshot
   ```
   Then press Enter:
   ```
   mcp__claude-in-chrome__computer with action: key, text: Return
   ```

6. Wait for download:
   ```
   mcp__claude-in-chrome__computer with action: wait, duration: 2
   ```

7. Close DevTools:
   ```
   mcp__claude-in-chrome__computer with action: key, text: ctrl+shift+i
   ```

8. Find the downloaded screenshot (it will be the most recent PNG in ~/Downloads/):
   ```bash
   ls -t ~/Downloads/*.png | head -1
   ```

9. Move it to the correct location:
   ```bash
   mv <downloaded-file> public/screenshot/{app-id}.png
   ```

### 4. Download and process icons

1. Create the icon directory:
   ```bash
   mkdir -p public/icons/{app-id}
   ```

2. Download the best available icon. Priority order:
   - PWA manifest icon (largest available)
   - Apple touch icon
   - Favicon (largest available)
   - OG image (last resort)

   ```bash
   curl -L -o public/icons/{app-id}/regular.png "{icon-url}"
   ```

3. Determine the icon size:
   ```bash
   file public/icons/{app-id}/regular.png
   ```
   Or use `identify` if available. Record the size for `logoSize`.

4. Create the Mac icon (resize to 1024x1024 if needed). If `sharp` or `magick` is available:
   ```bash
   magick public/icons/{app-id}/regular.png -resize 1024x1024 -background none -gravity center -extent 1024x1024 public/icons/{app-id}/mac.png
   ```
   If ImageMagick is not available, try:
   ```bash
   ffmpeg -i public/icons/{app-id}/regular.png -vf "scale=1024:1024:force_original_aspect_ratio=decrease,pad=1024:1024:(ow-iw)/2:(oh-ih)/2:color=0x00000000" public/icons/{app-id}/mac.png
   ```
   If neither is available, just copy the regular icon:
   ```bash
   cp public/icons/{app-id}/regular.png public/icons/{app-id}/mac.png
   ```

### 5. Create the JSON entry

Create `content/{app-id}.json` with this exact schema:

```json
{
  "id": "{app-id}",
  "name": "{App Name}",
  "description": "{Short description, max 100 chars}",
  "url": "{full-url-with-protocol}",
  "logo": "https://ftwa.mathix.dev/icons/{app-id}/regular.png",
  "macLogo": "https://ftwa.mathix.dev/icons/{app-id}/mac.png",
  "screenshot": "/screenshot/{app-id}.png",
  "tags": ["{tag1}", "{tag2}"],
  "logoSize": {size-in-px}
}
```

**Important rules:**
- `id`: Short brand name only, lowercase, hyphens for spaces (e.g., `youtube-music`)
- `name`: Clean brand name, proper capitalization, NO taglines or separators
- `description`: What the app DOES, max 100 characters, no marketing language
- `url`: Include protocol (https://)
- `logo` and `macLogo`: Always use absolute URLs with `https://ftwa.mathix.dev/icons/` prefix
- `screenshot`: Always relative path starting with `/screenshot/`
- `tags`: 2-4 tags from the approved list in tags.json
- `logoSize`: Actual icon size in pixels (common values: 128, 256, 512)
- Do NOT add a numeric prefix to the filename

### 6. Verify

After creating all files, show the user:
- The final JSON content
- Confirmation that the screenshot exists
- Confirmation that icons exist
- A summary of what was created
