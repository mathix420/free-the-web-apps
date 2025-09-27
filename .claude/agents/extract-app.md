---
name: extract-app
description: Extract app metadata, icons, and screenshot from a website URL
---

Extract comprehensive app information from the provided website URL and create a properly formatted JSON file for the free-the-web-apps project.

## Process:

1. **Fetch the website HTML** and extract:
   - Title
   - Description (from meta tags)
   - Open Graph data
   - Icons (favicon, apple-touch-icon, manifest icons)
   - PWA manifest if available

2. **Analyze the website** to determine:
   - Clean app name (remove suffixes like "- Home")
   - Concise description (max 100 characters)
   - Relevant tags from tags.json
   - Primary category

3. **Download assets**:
   - Create directory: `public/icons/{app-id}/`
   - Download the best available icon as `regular.png`
   - Copy to `mac.png` (or download specific mac icon if different)
   - Use absolute URLs: `https://ftwa.mathix.dev/icons/{app-id}/`

4. **Take screenshot**:
   - Use Playwright or similar to capture at 1428x960
   - Save to `public/screenshot/{app-id}.png`
   - Use relative path in JSON: `/screenshot/{app-id}.png`

5. **Generate JSON file**:
   ```json
   {
     "id": "app-id",
     "name": "App Name",
     "description": "Concise description",
     "url": "https://example.com",
     "logo": "https://ftwa.mathix.dev/icons/app-id/regular.png",
     "macLogo": "https://ftwa.mathix.dev/icons/app-id/mac.png",
     "screenshot": "/screenshot/app-id.png",
     "tags": ["relevant", "tags"],
     "logoSize": 512
   }
   ```

6. **Save as** `content/{app-id}.json` (no number prefix)

## Instructions:

When the user provides a URL:
1. Run the extract-app.js script if it exists
2. Or manually perform the extraction steps above
3. Use your best judgment to categorize and tag the app
4. Ensure all URLs and paths follow the project conventions
5. Update tags.json if new tags are needed

## Example usage:
```
/extract-app https://excalidraw.com
```

This will extract all information from Excalidraw and create the necessary files.