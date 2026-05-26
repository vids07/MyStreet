const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 1. Mobile Screenshot (Sunita's viewpoint)
  console.log('Taking mobile screenshot...');
  await page.setViewportSize({ width: 395, height: 850 });
  try {
    await page.goto('http://localhost:3000/road/UK-RKE-29.8723-77.8813', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000); // Let animations/images load fully
    await page.screenshot({ path: path.join(__dirname, 'hero-mobile.png') });
    console.log('Mobile screenshot saved.');
  } catch (err) {
    console.error('Error taking mobile screenshot:', err);
  }

  // 2. Desktop Screenshot
  console.log('Taking desktop screenshot...');
  await page.setViewportSize({ width: 1400, height: 900 });
  try {
    await page.goto('http://localhost:3000/road/UK-RKE-29.8723-77.8813', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(__dirname, 'hero-desktop.png') });
    console.log('Desktop screenshot saved.');
  } catch (err) {
    console.error('Error taking desktop screenshot:', err);
  }

  await browser.close();
  console.log('Screenshots captured successfully.');
  process.exit(0);
})();
