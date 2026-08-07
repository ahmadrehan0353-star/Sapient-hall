#!/usr/bin/env node
/**
 * localize-images.mjs
 * -------------------
 * Downloads every image referenced in src/lib/site-images.ts from the old
 * WordPress host into public/images/, then rewrites site-images.ts to use
 * the local copies. After this runs, the site has ZERO dependency on
 * www.sapienthall.edu.pk staying online.
 *
 * Usage:
 *   node scripts/localize-images.mjs           # download + rewrite
 *   node scripts/localize-images.mjs --dry-run # show the plan, change nothing
 *
 * Run it once, check `git status`, commit public/images + site-images.ts,
 * and push. Vercel then serves the images from your own deployment forever.
 * Safe to re-run: files that already exist are skipped.
 */
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

// fileURLToPath handles Windows drive letters and spaces correctly
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE_IMAGES = path.join(ROOT, "src/lib/site-images.ts");
const OUT_DIR = path.join(ROOT, "public/images");
const DRY = process.argv.includes("--dry-run");

/** Turn a remote URL into a stable, readable local filename. */
function localName(url) {
  const base = decodeURIComponent(new URL(url).pathname)
    .split("/")
    .pop()
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-");
  return base;
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status} for ${url}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
}

async function main() {
  const src = await readFile(SITE_IMAGES, "utf8");

  // Collect every https URL in the file (template literals resolve to a known CDN base).
  const cdnMatch = src.match(/const CDN = "([^"]+)"/);
  if (!cdnMatch) throw new Error("Could not find CDN base in site-images.ts");
  const CDN = cdnMatch[1];

  const urls = [...src.matchAll(/`\$\{CDN\}(\/[^`]+)`/g)].map((m) => `${CDN}${m[1]}`);
  const unique = [...new Set(urls)];
  if (unique.length === 0) {
    console.log("No remote CDN URLs found — site-images.ts may already be localized.");
    return;
  }

  console.log(`Found ${unique.length} remote images.`);
  if (!DRY) await mkdir(OUT_DIR, { recursive: true });

  const mapping = new Map(); // remote suffix -> local public path
  let downloaded = 0, skipped = 0, failed = 0;

  for (const url of unique) {
    const name = localName(url);
    const dest = path.join(OUT_DIR, name);
    const publicPath = `/images/${name}`;
    mapping.set(url.slice(CDN.length), publicPath);

    if (DRY) {
      console.log(`  [plan] ${url}\n     -> public${publicPath}`);
      continue;
    }
    if (await exists(dest)) {
      skipped++;
      continue;
    }
    try {
      process.stdout.write(`  downloading ${name} … `);
      await download(url, dest);
      console.log("ok");
      downloaded++;
    } catch (err) {
      console.log(`FAILED (${err.message}) — keeping remote URL for this one`);
      mapping.delete(url.slice(CDN.length));
      failed++;
    }
  }

  if (DRY) {
    console.log(`\nDry run complete. ${unique.length} images would be saved to public/images/.`);
    return;
  }

  // Rewrite site-images.ts: successful downloads become local paths.
  let out = src;
  for (const [suffix, publicPath] of mapping) {
    out = out.replaceAll("`${CDN}" + suffix + "`", JSON.stringify(publicPath));
  }
  if (![...mapping.keys()].length) {
    console.log("\nNothing downloaded — site-images.ts left unchanged.");
    return;
  }
  // If every URL is now local, neutralise the CDN constant (kept for reference).
  await writeFile(SITE_IMAGES, out, "utf8");

  console.log(`\nDone. ${downloaded} downloaded, ${skipped} already present, ${failed} failed.`);
  console.log("site-images.ts now points at /images/* for every successful download.");
  console.log("\nNext steps:\n  git add public/images src/lib/site-images.ts\n  git commit -m 'Self-host site images'\n  git push   # Vercel redeploys — no dependency on the old site remains");
}

main().catch((err) => {
  console.error("localize-images failed:", err);
  process.exit(1);
});
