const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1'
  });
  
  const page = await context.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER EXCEPTION:', err.message));

  try {
    console.log('Navigating to http://localhost:5173/');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    
    // Scroll down by 200px
    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(1000); // Wait for transition
    
    await page.waitForSelector('nav');
    
    const screenshotPath = path.join(__dirname, 'mobile_navbar_test_scrolled.png');
    await page.screenshot({ path: screenshotPath });
    console.log('Screenshot saved to:', screenshotPath);
    
    const navHTML = await page.evaluate(() => {
      const nav = document.querySelector('nav');
      return nav ? nav.outerHTML : 'No nav element found';
    });
    console.log('--- NAV ELEMENT HTML ---');
    console.log(navHTML);
    console.log('------------------------');
    
    const hamburgerInfo = await page.evaluate(() => {
      const btn = document.querySelector('button[aria-label="Open menu"]');
      if (!btn) return 'No hamburger button found';
      const rect = btn.getBoundingClientRect();
      const style = window.getComputedStyle(btn);
      return {
        tag: btn.outerHTML,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        zIndex: style.zIndex,
        color: style.color,
        backgroundColor: style.backgroundColor
      };
    });
    console.log('--- HAMBURGER BUTTON INFO ---');
    console.log(JSON.stringify(hamburgerInfo, null, 2));
    console.log('-----------------------------');
    
  } catch (error) {
    console.error('Error during execution:', error);
  } finally {
    await browser.close();
  }
})();
