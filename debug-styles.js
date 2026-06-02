const { chromium } = require('playwright');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1400, height: 900 });
  try {
    console.log('Navigating to road page...');
    await page.goto('http://localhost:3000/road/UK-RKE-29.8723-77.8813', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    console.log('Evaluating computed styles for the second nav link...');
    const styles = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('header nav a'));
      if (links.length === 0) return 'Links not found';

      return links.map((link, i) => {
        const computed = window.getComputedStyle(link);
        return {
          index: i,
          text: link.textContent.trim(),
          className: link.className,
          color: computed.color,
          opacity: computed.opacity,
          visibility: computed.visibility,
          display: computed.display,
          borderBottomColor: computed.borderBottomColor,
          fontFamily: computed.fontFamily,
          fontWeight: computed.fontWeight
        };
      });
    });

    console.log('Nav Links computed styles:', JSON.stringify(styles, null, 2));
  } catch (err) {
    console.error('Error debugging nav links:', err);
  }

  await browser.close();
  process.exit(0);
})();
