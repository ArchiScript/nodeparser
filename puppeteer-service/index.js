const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.use('/test', require('./deploy/deploy-webhook'));
app.get('/title', async (req, res) => {
  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: 'ws://browserless:3000'   
      // browserWSEndpoint: 'ws://localhost:3000'
    });

    const page = await browser.newPage();
    await page.goto('https://makler.md/ru/an/user/index/id/1262205');
    const title = await page.title();

    await browser.disconnect();
    res.send(`Title: ${title}`);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error running Puppeteer');
  }
});

app.listen(8081, '0.0.0.0', () => {
  console.log('Screapper test server listening on port 8081');
});