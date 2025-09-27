#!/usr/bin/env bun

/**
 * Free The Web Apps - Website App Extractor
 * Automatically extracts metadata, icons, and screenshots from websites
 * Run with: bun extract-app.cts <url>
 */

import { mkdir, exists } from "node:fs/promises";
import { join } from "node:path";
import puppeteer from "puppeteer";
import sharp from "sharp";

// Configuration
const ICONS_DIR = "./public/icons";
const SCREENSHOT_DIR = "./public/screenshot";
const CONTENT_DIR = "./content";
const TAGS_FILE = "./tags.json";
const BASE_URL = "https://ftwa.mathix.dev";

// Types
interface Metadata {
  title: string;
  description: string;
  icons: string[];
  ogImage?: string;
  appleTouchIcon?: string;
  favicon?: string;
  manifestUrl?: string;
}

interface EnhancedData {
  name: string;
  description: string;
  tags: string[];
}

interface AppData {
  id: string;
  name: string;
  description: string;
  url: string;
  logo: string;
  macLogo: string;
  screenshot: string;
  tags: string[];
  logoSize: number;
}

// Helper to ensure directory exists
async function ensureDir(dir: string): Promise<void> {
  if (!(await exists(dir))) {
    await mkdir(dir, { recursive: true });
  }
}

// Download file using Bun's fetch
async function downloadFile(url: string, filepath: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const buffer = await response.arrayBuffer();
    await Bun.write(filepath, buffer);
  } catch (error) {
    throw new Error(`Failed to download ${url}: ${error}`);
  }
}

// Fetch HTML content
async function fetchHTML(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  return response.text();
}

// Extract metadata from HTML
function extractMetadata(html: string, url: string): Metadata {
  const metadata: Metadata = {
    title: "",
    description: "",
    icons: [],
  };

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    metadata.title = titleMatch[1].trim();
  }

  // Extract description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (descMatch) {
    metadata.description = descMatch[1].trim();
  }

  // Extract Open Graph description as fallback
  if (!metadata.description) {
    const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
    if (ogDescMatch) {
      metadata.description = ogDescMatch[1].trim();
    }
  }

  // Extract Open Graph image
  const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  if (ogImageMatch) {
    metadata.ogImage = new URL(ogImageMatch[1], url).href;
  }

  // Extract Apple Touch Icon
  const appleTouchMatch = html.match(/<link\s+rel=["']apple-touch-icon[^"']*["']\s+href=["']([^"']+)["']/i);
  if (appleTouchMatch) {
    metadata.appleTouchIcon = new URL(appleTouchMatch[1], url).href;
  }

  // Extract favicons
  const faviconMatches = html.matchAll(/<link\s+(?:[^>]*\s+)?rel=["'](?:icon|shortcut icon)["'](?:\s+[^>]*)?\s+href=["']([^"']+)["']/gi);
  for (const match of faviconMatches) {
    metadata.icons.push(new URL(match[1], url).href);
  }

  // Try standard favicon.ico if no icon found
  if (metadata.icons.length === 0) {
    metadata.favicon = new URL("/favicon.ico", url).href;
  }

  // Extract PWA manifest if available
  const manifestMatch = html.match(/<link\s+rel=["']manifest["']\s+href=["']([^"']+)["']/i);
  if (manifestMatch) {
    metadata.manifestUrl = new URL(manifestMatch[1], url).href;
  }

  return metadata;
}

// Fetch and parse PWA manifest
async function fetchManifest(manifestUrl: string): Promise<any | null> {
  try {
    const response = await fetch(manifestUrl);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.log("⚠️  Could not fetch or parse manifest");
    return null;
  }
}

// Resize icon to 1024x1024 for Mac
async function resizeIconForMac(inputPath: string, outputPath: string): Promise<void> {
  try {
    await sharp(inputPath)
      .resize(1024, 1024, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 } // transparent background
      })
      .png() // Always output as PNG for Mac
      .toFile(outputPath);
  } catch (error) {
    console.error(`  ⚠️  Failed to resize icon for Mac: ${error}`);
    // Fallback: copy the original if sharp fails
    const originalFile = Bun.file(inputPath);
    await Bun.write(outputPath, originalFile);
  }
}

// Take screenshot using Puppeteer
async function takeScreenshot(url: string, outputPath: string): Promise<boolean> {
  try {
    console.log("📸 Launching browser for screenshot...");
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "/usr/bin/chromium", // Use Chromium browser
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 1428,
      height: 960,
      deviceScaleFactor: 2 // 2x pixel ratio for high DPI
    });

    console.log("📸 Navigating to website...");
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    console.log("📸 Capturing screenshot...");
    await page.screenshot({
      path: outputPath,
      type: "png",
    });

    await browser.close();
    console.log("✅ Screenshot saved");
    return true;
  } catch (error) {
    console.error(`❌ Failed to take screenshot: ${error}`);
    return false;
  }
}

// Generate app ID from name or URL
function generateAppId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Get file extension from URL
function getExtension(url: string): string {
  try {
    const urlPath = new URL(url).pathname;
    const ext = urlPath.split(".").pop()?.toLowerCase();
    if (ext && ["png", "jpg", "jpeg", "svg", "webp", "ico"].includes(ext)) {
      return `.${ext}`;
    }
  } catch {}
  return ".png";
}

// Fix and improve JSON with Claude Code
async function fixJsonWithClaude(appData: AppData, url: string): Promise<AppData> {
  // Read available tags for reference
  const tagsFile = Bun.file(TAGS_FILE);
  const existingTags: string[] = await tagsFile.json();

  const prompt = `Review and fix this app JSON data extracted from ${url}.

Current JSON:
${JSON.stringify(appData, null, 2)}

CRITICAL FIXES REQUIRED:
1. "id": Must be a SHORT, SIMPLE identifier. Examples:
   - "github" (NOT "github-build-and-ship-software-on-a-single-collaborative-platform-github")
   - "tiktok" (NOT "tiktok-make-your-day")
   - "notion" (NOT "notion-the-all-in-one-workspace")
   Just the brand name, lowercase, no taglines or descriptions

2. "name": Must be ONLY the brand/app name. Examples:
   - "GitHub" (NOT "GitHub · Build and ship software on a single, collaborative platform · GitHub")
   - "TikTok" (NOT "TikTok - Make Your Day")
   - "Notion" (NOT "Notion - The all-in-one workspace")
   Clean, simple, proper capitalization, NO taglines

3. "description": Write a SHORT, clear description of the app's PURPOSE (max 100 chars):
   - "Code hosting and collaboration platform" (for GitHub)
   - "Short-form video sharing platform" (for TikTok)
   - "All-in-one workspace for notes and collaboration" (for Notion)
   NOT HTML entities, NOT truncated marketing copy

4. "tags": Pick 2-4 RELEVANT tags from this list: ${existingTags.join(", ")}

IMPORTANT: Keep logo paths, screenshot path, url, and logoSize EXACTLY as they are.

Output ONLY the corrected JSON object, no explanation:`;

  try {
    console.log("  🤖 Using Claude to finalize app data...");

    // Use bunx to run Claude Code with the prompt
    const proc = Bun.spawn([
      "bunx",
      "@anthropic-ai/claude-code",
      prompt,
      "-p"
    ], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const output = await new Response(proc.stdout).text();
    const errorOutput = await new Response(proc.stderr).text();

    if (proc.exitCode !== 0) {
      throw new Error(`Claude Code failed: ${errorOutput}`);
    }

    // Parse the JSON response
    try {
      // Clean the output - remove any markdown formatting if present
      const jsonStr = output
        .trim()
        .replace(/^```json\n?/, "")
        .replace(/\n?```$/, "")
        .trim();

      const result = JSON.parse(jsonStr) as AppData;

      // Validate the response has all required fields
      if (!result.id || !result.name || !result.description || !Array.isArray(result.tags)) {
        throw new Error("Invalid response structure");
      }

      console.log("  ✅ App data finalized");
      console.log(`  Final ID: ${result.id}`);
      console.log(`  Final Name: ${result.name}`);
      console.log(`  Final Tags: ${result.tags.join(", ")}`);

      // Keep original paths and logoSize
      return {
        ...appData,
        id: result.id,
        name: result.name,
        description: result.description,
        tags: result.tags,
      };
    } catch (parseError) {
      console.log("  ⚠️  Failed to parse Claude response");
      throw parseError;
    }
  } catch (error) {
    console.log(`  ⚠️  Claude finalization failed: ${error}`);
    console.log("  📝 Using original data");
    return appData;
  }
}

// Enhanced metadata with Claude Code for dynamic parsing
async function enhanceMetadata(metadata: Metadata, url: string): Promise<EnhancedData> {
  // Read available tags
  const tagsFile = Bun.file(TAGS_FILE);
  const existingTags: string[] = await tagsFile.json();

  // Clean up the name first (basic cleanup)
  const cleanedName = metadata.title
    .replace(/ - Home| - Official.*| \|.*| –.*/, "")
    .trim();

  // Prepare prompt for Claude
  const prompt = `Extract clean app information from this website:

URL: ${url}
Title: ${metadata.title}
Description: ${metadata.description || "No description available"}

Available tags: ${existingTags.join(", ")}

Create a JSON with:
1. "name": Extract ONLY the brand/app name from the title. Examples:
   - From "GitHub · Build and ship software..." → "GitHub"
   - From "TikTok - Make Your Day" → "TikTok"
   - From "Excalidraw — Collaborative whiteboarding" → "Excalidraw"
   Remove ALL taglines, separators (·, -, —, |), and extra text

2. "description": Write a SHORT description of what the app DOES (max 100 chars):
   - Be specific about the app's purpose
   - Don't copy marketing language
   - No HTML entities (&quot;, &#39;, etc.)

3. "tags": Pick 2-4 tags that best describe this app from the list above

Output ONLY valid JSON, no markdown:`;

  try {
    console.log("  🤖 Using Claude Code for analysis...");

    // Use bunx to run Claude Code with the prompt
    const proc = Bun.spawn([
      "bunx",
      "@anthropic-ai/claude-code",
      prompt,
      "-p"
    ], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const output = await new Response(proc.stdout).text();
    const errorOutput = await new Response(proc.stderr).text();

    if (proc.exitCode !== 0) {
      throw new Error(`Claude Code failed: ${errorOutput}`);
    }

    // Parse the JSON response
    try {
      // Clean the output - remove any markdown formatting if present
      const jsonStr = output
        .trim()
        .replace(/^```json\n?/, "")
        .replace(/\n?```$/, "")
        .trim();

      const result = JSON.parse(jsonStr);

      // Validate the response has required fields
      if (!result.name || !result.description || !Array.isArray(result.tags)) {
        throw new Error("Invalid response structure");
      }

      console.log("  ✅ Claude analysis complete");
      return {
        name: result.name,
        description: result.description,
        tags: result.tags,
      };
    } catch (parseError) {
      console.log("  ⚠️  Failed to parse Claude response, trying fallback");
      throw parseError;
    }
  } catch (error) {
    console.log(`  ⚠️  Claude Code unavailable: ${error}`);
    console.log("  📝 Using fallback tag inference");

    // Fallback to basic inference
    let description = metadata.description || `${cleanedName} web application`;
    if (description.length > 100) {
      description = description.substring(0, 97) + "...";
    }

    // Basic tag inference based on common keywords
    const tags: string[] = ["tool"];
    const combined = `${metadata.title} ${metadata.description}`.toLowerCase();

    // Simple keyword matching for fallback
    if (combined.includes("chat") || combined.includes("message")) {
      if (existingTags.includes("chat")) tags.push("chat");
    }
    if (combined.includes("music") || combined.includes("audio")) {
      if (existingTags.includes("music")) tags.push("music");
    }
    if (combined.includes("video") || combined.includes("stream")) {
      if (existingTags.includes("streaming")) tags.push("streaming");
    }
    if (combined.includes("design") || combined.includes("draw")) {
      if (existingTags.includes("design")) tags.push("design");
    }
    if (combined.includes("code") || combined.includes("develop")) {
      if (existingTags.includes("programming")) tags.push("programming");
    }
    if (combined.includes("social") || combined.includes("community")) {
      if (existingTags.includes("social")) tags.push("social");
    }
    if (combined.includes("ai") || combined.includes("gpt") || combined.includes("claude")) {
      if (existingTags.includes("ai")) tags.push("ai");
    }

    // Limit to 4 tags
    const uniqueTags = [...new Set(tags)].slice(0, 4);

    return {
      name: cleanedName,
      description,
      tags: uniqueTags,
    };
  }
}

// Main extraction function
async function extractApp(url: string): Promise<void> {
  console.log(`\n🔍 Extracting app from: ${url}\n`);

  try {
    // Ensure directories exist
    await ensureDir(ICONS_DIR);
    await ensureDir(SCREENSHOT_DIR);
    await ensureDir(CONTENT_DIR);

    // Step 1: Fetch HTML and extract metadata
    console.log("📄 Fetching webpage...");
    const html = await fetchHTML(url);
    const metadata = extractMetadata(html, url);

    // Step 2: Fetch PWA manifest if available
    if (metadata.manifestUrl) {
      console.log("📦 Fetching PWA manifest...");
      const manifest = await fetchManifest(metadata.manifestUrl);
      if (manifest) {
        if (!metadata.title && manifest.name) {
          metadata.title = manifest.name;
        }
        if (!metadata.description && manifest.description) {
          metadata.description = manifest.description;
        }
        if (manifest.icons?.length > 0) {
          // Get the largest icon
          const largestIcon = manifest.icons.reduce((prev: any, current: any) => {
            const prevSize = parseInt(prev.sizes?.split("x")[0] || "0");
            const currentSize = parseInt(current.sizes?.split("x")[0] || "0");
            return currentSize > prevSize ? current : prev;
          });
          if (largestIcon.src) {
            const iconUrl = new URL(largestIcon.src, url).href;
            metadata.icons.unshift(iconUrl); // Add to beginning for priority
          }
        }
      }
    }

    // Step 3: Enhance metadata
    console.log("🤖 Processing metadata...");
    const enhanced = await enhanceMetadata(metadata, url);
    console.log(`  Name: ${enhanced.name}`);
    console.log(`  Description: ${enhanced.description}`);
    console.log(`  Tags: ${enhanced.tags.join(", ")}`);

    // Generate initial app ID from the enhanced name
    const initialAppId = generateAppId(enhanced.name);
    const appIconDir = join(ICONS_DIR, initialAppId);

    // Create app icon directory
    await ensureDir(appIconDir);

    // Step 4: Download icons
    console.log("\n🎨 Downloading icons...");
    const iconUrl =
      metadata.icons[0] ||
      metadata.appleTouchIcon ||
      metadata.ogImage ||
      metadata.favicon;

    let iconExtension = ".png";
    if (iconUrl) {
      try {
        iconExtension = getExtension(iconUrl);
        const iconPath = join(appIconDir, `regular${iconExtension}`);
        console.log(`  Downloading from: ${iconUrl}`);
        await downloadFile(iconUrl, iconPath);
        console.log(`  ✅ Icon saved: regular${iconExtension}`);

        // Resize for Mac icon (must be 1024x1024)
        const macIconPath = join(appIconDir, `mac.png`); // Always PNG for Mac
        await resizeIconForMac(iconPath, macIconPath);
        console.log(`  ✅ Mac icon created: mac.png (1024x1024)`);

        // Update extension for Mac icon to always be .png
        iconExtension = ".png";
      } catch (error) {
        console.error(`  ⚠️  Failed to download icon: ${error}`);
      }
    } else {
      console.log("  ⚠️  No icon URL found");
    }

    // Step 5: Take screenshot
    console.log("\n📸 Taking screenshot...");
    const screenshotPath = join(SCREENSHOT_DIR, `${initialAppId}.png`);
    await takeScreenshot(url, screenshotPath);

    // Step 6: Generate initial JSON
    let appData: AppData = {
      id: initialAppId,
      name: enhanced.name,
      description: enhanced.description,
      url: url,
      logo: `${BASE_URL}/icons/${initialAppId}/regular${iconExtension}`,
      macLogo: `${BASE_URL}/icons/${initialAppId}/mac.png`, // Mac icon is always PNG
      screenshot: `/screenshot/${initialAppId}.png`,
      tags: enhanced.tags,
      logoSize: 512,
    };

    // Step 7: Use Claude to fix/improve the JSON
    console.log("\n🔧 Finalizing app data with Claude...");
    appData = await fixJsonWithClaude(appData, url);

    // If the app ID changed, rename the icon directory
    if (appData.id !== initialAppId) {
      const newAppIconDir = join(ICONS_DIR, appData.id);
      await ensureDir(newAppIconDir);

      // Move icon files to new directory
      const oldRegularIcon = join(appIconDir, `regular${iconExtension}`);
      const oldMacIcon = join(appIconDir, `mac.png`); // Mac icon is always PNG
      const newRegularIcon = join(newAppIconDir, `regular${iconExtension}`);
      const newMacIcon = join(newAppIconDir, `mac.png`); // Mac icon is always PNG

      if (await exists(oldRegularIcon)) {
        const iconFile = Bun.file(oldRegularIcon);
        await Bun.write(newRegularIcon, iconFile);
      }
      if (await exists(oldMacIcon)) {
        const iconFile = Bun.file(oldMacIcon);
        await Bun.write(newMacIcon, iconFile);
      }

      // Update paths in appData
      appData.logo = `${BASE_URL}/icons/${appData.id}/regular${iconExtension}`;
      appData.macLogo = `${BASE_URL}/icons/${appData.id}/mac.png`; // Mac icon is always PNG

      // Also rename screenshot
      const oldScreenshot = join(SCREENSHOT_DIR, `${initialAppId}.png`);
      const newScreenshot = join(SCREENSHOT_DIR, `${appData.id}.png`);
      if (await exists(oldScreenshot)) {
        const screenshotFile = Bun.file(oldScreenshot);
        await Bun.write(newScreenshot, screenshotFile);
        // Remove old screenshot
        await Bun.$`rm ${oldScreenshot}`.quiet();
      }
      appData.screenshot = `/screenshot/${appData.id}.png`;

      // Remove old icon directory
      await Bun.$`rm -rf ${appIconDir}`.quiet();
    }

    // Step 8: Save JSON file
    const jsonPath = join(CONTENT_DIR, `${appData.id}.json`);
    await Bun.write(jsonPath, JSON.stringify(appData, null, 2) + "\n");

    console.log(`\n✅ App successfully extracted!`);
    console.log(`📁 JSON saved to: ${jsonPath}`);
    console.log(`\n📋 App Data:`);
    console.log(JSON.stringify(appData, null, 2));

    // Step 8: Check for new tags
    const tagsFile = Bun.file(TAGS_FILE);
    const existingTags: string[] = await tagsFile.json();
    const newTags = enhanced.tags.filter(tag => !existingTags.includes(tag));

    if (newTags.length > 0) {
      console.log(`\n📝 New tags suggested: ${newTags.join(", ")}`);
      console.log("Consider adding them to tags.json if appropriate.");
    }

  } catch (error) {
    console.error(`\n❌ Extraction failed: ${error}`);
    process.exit(1);
  }
}

// CLI interface
async function main() {
  const args = Bun.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(`
Free The Web Apps - Automatic App Extractor
============================================

Usage: bun extract-app.cts <website-url>

Examples:
  bun extract-app.cts https://excalidraw.com
  bun extract-app.cts https://notion.so

This script will:
1. Fetch the website and extract metadata
2. Download appropriate icons
3. Take a screenshot using Puppeteer
4. Generate appropriate tags
5. Create a properly formatted JSON file

Requirements:
- Bun runtime
- Internet connection
- Puppeteer (installed as dev dependency)
    `);
    process.exit(0);
  }

  const url = args[0];

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    console.error("❌ Please provide a valid URL starting with http:// or https://");
    process.exit(1);
  }

  await extractApp(url);
}

// Run the script
if (import.meta.main) {
  main().catch(console.error);
}