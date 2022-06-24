var express = require('express');
var router = express.Router();
const path = 'file:///var/www/design.webtrixpro.net/node/mern/downloaded/';
//const path = 'file:///home/ocs-11/dev/MERN/api/downloaded/';

const chromium = require('chrome-aws-lambda');
const playwright = require('playwright-core');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api-about', async function (req, res, next) {
  try {

    const browser = await playwright.chromium.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      //executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage()
    await page.goto(path + 'about-pegepay.html')

    const response = await page.evaluate(() => {
      return document.querySelector("body > section > div.container").outerHTML;
    })

    res.send(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/api-terms-condition/', async function (req, res, next) {
  try {

    const browser = await playwright.chromium.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      //executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage()
    await page.goto(path + 'terms-condition.html')

    const response = await page.evaluate(() => {
      return document.querySelector("body > section > div.container").outerHTML;
    })

    res.send(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get('/api-privacy-policy/', async function (req, res, next) {
  try {

    const browser = await playwright.chromium.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      //executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage()
    await page.goto(path + 'privacy-policy.html')

    const response = await page.evaluate(() => {
      return document.querySelector("body > section > div.container").outerHTML;
    })

    res.send(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
