const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    console.log('Navigating to http://localhost:3000/road/UK-RKE-29.8723-77.8813...');
    await page.goto('http://localhost:3000/road/UK-RKE-29.8723-77.8813', { waitUntil: 'networkidle', timeout: 15000 });
    console.log('Page loaded successfully. Title:', await page.title());
    const screenshotPath = 'C:/Users/USER/.gemini/antigravity/brain/c621a7a4-4e2f-41e2-bca6-85ff542908e4/road_screenshot.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log('Screenshot saved to:', screenshotPath);
  } catch (error) {
    console.error('Error during navigation:', error);
  } finally {
    await browser.close();
  }
})();
