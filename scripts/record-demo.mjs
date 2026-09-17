#!/usr/bin/env node

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, copyFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORTS = [3000, 3001];
const VIEWPORT = { width: 1440, height: 900 };
const OUTPUT_DIR = path.join(ROOT, ".demo-video");
const DESKTOP_DIR = path.join(process.env.HOME || "", "Desktop", "crypterchat-captures");
const DESKTOP_VIDEO = path.join(DESKTOP_DIR, "walkthrough.webm");
const DEMO = "?demo=1";
const NAV_OPTS = { waitUntil: "load", timeout: 60000 };

const PAGES = [
  { name: "home", path: `/${DEMO}`, scroll: 600 },
  { name: "landing", path: `/landing${DEMO}`, scroll: 800, fullPage: false },
  { name: "login", path: `/login${DEMO}`, scroll: 0 },
  { name: "api-key", path: `/api/key${DEMO}`, scroll: 500, generateKey: true },
  { name: "server", path: `/server${DEMO}`, scroll: 400 },
  { name: "chatscan", path: `/chatscan${DEMO}`, scroll: 400 },
  { name: "docs", path: `/docs${DEMO}`, scroll: 800 },
  { name: "blog", path: `/blog${DEMO}`, scroll: 400 },
];

async function goto(page, url) {
  await page.goto(url, NAV_OPTS);
  await sleep(1500);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function findRunningServer() {
  for (const port of PORTS) {
    try {
      const res = await fetch(`http://localhost:${port}`);
      if (res.ok || res.status < 500) return port;
    } catch {
      // not running on this port
    }
  }
  return null;
}

async function waitForServer(port, timeoutMs = 90000) {
  const url = `http://localhost:${port}`;
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return url;
    } catch {
      // server not ready yet
    }
    await sleep(1000);
  }
  throw new Error(`Server did not start on ${url}`);
}

function startDevServer(port) {
  return spawn("npx", ["next", "dev", "-p", String(port)], {
    cwd: ROOT,
    env: { ...process.env, NEXT_PUBLIC_DEMO_MODE: "true" },
    stdio: ["ignore", "pipe", "pipe"],
  });
}

async function savePageVideo(video, destPath) {
  if (!video) return false;
  let tempPath = null;
  for (let i = 0; i < 20; i++) {
    try {
      tempPath = await video.path();
      if (tempPath) break;
    } catch {
      // video still finalizing
    }
    await sleep(500);
  }
  if (!tempPath) return false;
  await copyFile(tempPath, destPath);
  return true;
}

async function captureScreenshotsAndPageVideos(baseUrl) {
  console.log("Capturing screenshots and per-page videos...");
  const shotDir = path.join(DESKTOP_DIR, "screenshots");
  const videoDir = path.join(DESKTOP_DIR, "page-videos");
  await mkdir(shotDir, { recursive: true });
  await mkdir(videoDir, { recursive: true });

  for (const entry of PAGES) {
    const pageOut = path.join(OUTPUT_DIR, `page-${entry.name}`);
    await mkdir(pageOut, { recursive: true });

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: VIEWPORT,
      recordVideo: { dir: pageOut, size: VIEWPORT },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    try {
      await goto(page, `${baseUrl}${entry.path}`);
      await sleep(1500);
      if (entry.generateKey) {
        const genBtn = page.getByRole("button", { name: /generate key/i });
        if (await genBtn.isVisible().catch(() => false)) {
          await genBtn.click({ force: true });
          await sleep(4000);
        }
      }
      if (entry.scroll > 0) {
        await page.mouse.wheel(0, entry.scroll);
        await sleep(1200);
        await page.evaluate(() => window.scrollTo(0, 0));
        await sleep(800);
      }

      const shotPath = path.join(shotDir, `${entry.name}.png`);
      await page.screenshot({
        path: shotPath,
        fullPage: entry.fullPage !== false,
        timeout: 60000,
      });
      console.log(`  screenshot: ${shotPath}`);

      const video = page.video();
      await context.close();
      await browser.close();

      const destVideo = path.join(videoDir, `${entry.name}.webm`);
      const saved = await savePageVideo(video, destVideo);
      if (saved) {
        console.log(`  page video: ${destVideo}`);
      } else {
        const files = await readdir(pageOut);
        const webm = files.find((f) => f.endsWith(".webm"));
        if (webm) {
          await copyFile(path.join(pageOut, webm), destVideo);
          console.log(`  page video: ${destVideo}`);
        }
      }
    } catch (err) {
      console.warn(`  skipped ${entry.name}: ${err.message}`);
      await context.close().catch(() => {});
      await browser.close().catch(() => {});
    } finally {
      await rm(pageOut, { recursive: true, force: true });
    }
  }
}

async function recordWalkthrough(baseUrl) {
  console.log("Recording full walkthrough video...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: { dir: OUTPUT_DIR, size: VIEWPORT },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await goto(page, `${baseUrl}/login${DEMO}`);
  await sleep(2000);

    await goto(page, `${baseUrl}/api/key${DEMO}`);
    await sleep(2500);
    const genBtn = page.getByRole("button", { name: /generate key/i });
    if (await genBtn.isVisible().catch(() => false)) {
      await genBtn.click({ force: true });
      await sleep(4000);
    }
    await page.mouse.wheel(0, 500);
    await sleep(1500);

  await page.click('a[href="/server"]').catch(() => {});
  await page.waitForURL("**/server**", { timeout: 15000 }).catch(() => {});
  await sleep(2000);
  const testBtn = page.getByRole("button", { name: /test connection/i });
  if (await testBtn.isVisible().catch(() => false)) {
    await testBtn.click();
    await sleep(2500);
  }
  await page.mouse.wheel(0, 600);
  await sleep(2000);

  await page.click('a[href="/chatscan"]').catch(() => {});
  await page.waitForURL("**/chatscan**", { timeout: 15000 }).catch(() => {});
  await sleep(3000);

  await page.click('a[href="/docs"]').catch(() => {});
  await page.waitForURL("**/docs**", { timeout: 15000 }).catch(() => {});
  await sleep(2000);
  await page.mouse.wheel(0, 800);
  await sleep(2500);
  await page.mouse.wheel(0, 800);
  await sleep(2000);

  await page.click('a[href="/api/key"]').catch(() => {});
  await page.waitForURL("**/api/key**", { timeout: 15000 }).catch(() => {});
  await sleep(2500);

  const video = page.video();
  await context.close();
  await browser.close();

  const saved = await savePageVideo(video, DESKTOP_VIDEO);
  if (!saved) {
    await sleep(2000);
    const files = await readdir(OUTPUT_DIR);
    const webm = files.find((f) => f.endsWith(".webm"));
    if (!webm) throw new Error("Walkthrough video was not created");
    await copyFile(path.join(OUTPUT_DIR, webm), DESKTOP_VIDEO);
  }
  console.log(`Walkthrough saved to: ${DESKTOP_VIDEO}`);
}

async function recordDemo() {
  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(DESKTOP_DIR, { recursive: true });

  let server = null;
  let baseUrl = null;

  const existingPort = await findRunningServer();
  if (existingPort) {
    baseUrl = `http://localhost:${existingPort}`;
    console.log(`Using existing server at ${baseUrl}`);
  } else {
    const port = 3001;
    console.log("Starting dev server...");
    server = startDevServer(port);
    server.stdout?.on("data", (d) => process.stdout.write(d));
    server.stderr?.on("data", (d) => process.stderr.write(d));
    baseUrl = await waitForServer(port);
    console.log(`Server ready at ${baseUrl}`);
  }

  try {
    await captureScreenshotsAndPageVideos(baseUrl);
    await recordWalkthrough(baseUrl);
    console.log(`\nAll captures saved under: ${DESKTOP_DIR}`);
  } finally {
    if (server) {
      server.kill("SIGTERM");
      await sleep(1000);
    }
    await sleep(500);
    await rm(OUTPUT_DIR, { recursive: true, force: true });
  }
}

recordDemo().catch((err) => {
  console.error("Recording failed:", err);
  process.exit(1);
});
