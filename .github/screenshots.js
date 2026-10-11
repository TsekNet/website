const { chromium } = require('playwright');

const BEFORE = 'https://tseknet.com';
const AFTER = 'http://127.0.0.1:4000';

const targets = (base, prefix) => ([
  { url: `${base}/`, out: `${prefix}-home.png` },
  { url: `${base}/tag/`, out: `${prefix}-tags.png` },
  { url: `${base}/tag/`, out: `${prefix}-tags-scrolled.png`, scrollY: 900 },
  { url: `${base}/blog/psprofile`, out: `${prefix}-psprofile-broken-images.png`, scrollSel: "img[src*='admin_git']" },
  { url: `${base}/404.html`, out: `${prefix}-404.png` },
]);

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  for (const t of [...targets(BEFORE, 'before'), ...targets(AFTER, 'after')]) {
    try {
      await page.goto(t.url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(1500);
      if (t.scrollSel) {
        await page.locator(t.scrollSel).first().scrollIntoViewIfNeeded({ timeout: 10000 }).catch(() => {});
        await page.waitForTimeout(1500);
      } else if (t.scrollY) {
        await page.evaluate((y) => window.scrollTo(0, y), t.scrollY);
        await page.waitForTimeout(800);
      }
      await page.screenshot({ path: t.out, fullPage: false });
      console.log('OK', t.out);
    } catch (e) {
      console.error('FAIL', t.out, e.message.split('\n')[0]);
    }
  }
  await browser.close();
})();
