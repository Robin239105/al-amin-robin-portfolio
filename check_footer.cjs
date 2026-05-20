const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1'
  });
  
  const page = await context.newPage();
  
  try {
    console.log('Navigating to http://localhost:5173/about');
    await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle' });
    
    // Scroll to the bottom of the page to focus on the footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500); // Wait for transition and scroll
    
    const screenshotPath = path.join(__dirname, 'mobile_footer_test.png');
    await page.screenshot({ path: screenshotPath });
    console.log('Footer screenshot saved to:', screenshotPath);
    
    const footerHTML = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      return footer ? footer.outerHTML : 'No footer element found';
    });
    console.log('--- FOOTER ELEMENT HTML ---');
    console.log(footerHTML.substring(0, 500) + '...');
    
  } catch (error) {
    console.error('Error during execution:', error);
  } finally {
    await browser.close();
  }
})();
