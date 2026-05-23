const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto('http://localhost:3000/road/UK-RKE-29.8723-77.8813');
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => { document.querySelector('section[id="section3"]').scrollIntoView(); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'section3-zoom.png' });
  await browser.close();
  console.log('done');
})();
