// screenshot.mjs — saves to ./temporary screenshots/screenshot-N[-label].png
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';

// Find next available index
const existing = fs.readdirSync(outDir).filter(f => /^screenshot-\d/.test(f));
const maxN = existing.reduce((m, f) => {
  const n = parseInt(f.match(/^screenshot-(\d+)/)?.[1] ?? '0', 10);
  return Math.max(m, n);
}, 0);
const filename = `screenshot-${maxN + 1}${label}.png`;
const outPath = path.join(outDir, filename);

// Resolve executablePath — puppeteer.executablePath() may return a Promise
const rawExec = puppeteer.executablePath();
const executablePath = rawExec instanceof Promise ? await rawExec : rawExec;

// Find system Chrome / Chromium if the bundled one isn't present
const candidates = [
  executablePath,
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/snap/bin/chromium',
];
const resolvedExec = candidates.find(p => p && fs.existsSync(p));
if (!resolvedExec) {
  console.error('No Chrome/Chromium found. Install chromium-browser or puppeteer.');
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath: resolvedExec,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 800)); // let fonts/animations settle
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();

console.log(outPath);
