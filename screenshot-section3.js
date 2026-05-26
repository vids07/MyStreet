const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 1100 });

  try {
    console.log('Navigating to road page...');
    await page.goto('http://localhost:3000/road/UK-RKE-29.8723-77.8813', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000); // Wait for images/animations

    console.log('Scrolling to Section 3...');
    await page.evaluate(() => {
      const section = document.querySelector('section[id="section3"]');
      if (section) {
        section.scrollIntoView({ block: 'start' });
      }
    });
    await page.waitForTimeout(1000);

    // Take screenshot of Section 3
    const sectionElement = await page.$('section[id="section3"]');
    if (sectionElement) {
      console.log('Capturing Section 3...');
      await sectionElement.screenshot({ path: path.join(__dirname, 'condition-hud-clear.png') });
      console.log('Section 3 screenshot saved as condition-hud-clear.png');
    } else {
      console.log('Section 3 not found, taking full page screenshot...');
      await page.screenshot({ path: path.join(__dirname, 'condition-hud-clear.png') });
    }
  } catch (err) {
    console.error('Error running screenshot script:', err);
  } finally {
    await browser.close();
  }
  process.exit(0);
})();
