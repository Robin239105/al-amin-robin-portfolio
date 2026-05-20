const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1'
  });
  
  const page = await context.newPage();
  
  try {
    console.log('Navigating to http://localhost:5173/');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    
    await page.waitForSelector('button[aria-label="Open menu"]');
    await page.click('button[aria-label="Open menu"]');
    await page.waitForTimeout(1500); // Wait for transition
    
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    fs.writeFileSync(path.join(__dirname, 'body_output.txt'), bodyHTML);
    console.log('Body HTML written to body_output.txt');

    await page.screenshot({ path: path.join(__dirname, 'mobile_menu_open_test.png') });
    console.log('Screenshot saved to mobile_menu_open_test.png');
    
  } catch (error) {
    console.error('Error during execution:', error);
  } finally {
    await browser.close();
  }
})();
