#!/usr/bin/env node

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.join(ROOT, "docs", "screenshots");
const ARTIFACTS_DIR = "/opt/cursor/artifacts";
const VIEWPORT = { width: 1440, height: 900 };
const BASE = process.env.BASE_URL || "http://localhost:3000";

const PAGES = [
  { name: "home", path: "/", fullPage: false },
  { name: "home_full", path: "/", fullPage: true },
  { name: "landing", path: "/landing", fullPage: false },
  { name: "landing_full", path: "/landing", fullPage: true },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function hideOverlays(page) {
  await page.addStyleTag({
    content: `
      nextjs-portal, [data-next-mark-loading], #__next-build-watcher,
      iframe[src*="notion"], .notion-widget { display: none !important; }
    `,
  });
  await page.evaluate(() => {
    document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
  });
}

async function tryWriteArtifact(name, buffer) {
  try {
    await mkdir(ARTIFACTS_DIR, { recursive: true });
    const artifactPath = path.join(ARTIFACTS_DIR, `${name}_page.png`);
    await writeFile(artifactPath, buffer);
    console.log(`  artifact: ${artifactPath}`);
  } catch (err) {
    console.warn(`  skipped artifact (${err.message})`);
  }
}

async function main() {
  await mkdir(DOCS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  for (const entry of PAGES) {
    const url = `${BASE}${entry.path}`;
    console.log(`Capturing ${entry.name} → ${url}`);
    await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
    await sleep(2500);
    await hideOverlays(page);
    await sleep(400);

    const buffer = await page.screenshot({
      fullPage: entry.fullPage,
      timeout: 60000,
    });

    if (entry.name === "home" || entry.name === "landing") {
      const docsPath = path.join(DOCS_DIR, `${entry.name}.png`);
      await writeFile(docsPath, buffer);
      console.log(`  docs: ${docsPath}`);
    }

    await tryWriteArtifact(entry.name, buffer);
  }

  await browser.close();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
