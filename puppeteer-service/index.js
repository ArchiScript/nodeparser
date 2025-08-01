const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: 'ws://browserless:3000'
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');
    console.log(await page.title());

    await browser.disconnect();
  } catch (err) {
    console.error('Error caught:', err);
    process.exit(1); // optional: exit with error code
  }
})();