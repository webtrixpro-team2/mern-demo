var express = require("express");
const chromium = require('chrome-aws-lambda');
const playwright = require('playwright-core');
var router = express.Router();
const fs = require('fs');
const path = '/var/www/design.webtrixpro.net/node/mern/downloaded/';
//const path = '/home/ocs-11/dev/MERN/api/downloaded/';
const targetSite = "https://www.pegepay.com/";
let vistedUrl = [];

router.get("/", async function (req, res, next) {
    vistedUrl = []
    try {
        const response = await start()
        res.setHeader('Content-Type', 'application/json');
        res.send(response)
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

async function start() {
    const browser = await playwright.chromium.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        //executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    });

    await crawlAll(targetSite, browser);
    await browser.close()
    return vistedUrl;
}

// Fetch all deep Links recursively
async function crawlAll(crawlUrl, browser) {
    console.log(crawlUrl)
    const page = await browser.newPage()
    await page.goto(crawlUrl)
    var hrefs = await page.$$eval('a', as => as.map(a => a.href));
    hrefs = [...new Set(hrefs)];

    vistedUrl.push(crawlUrl);
    let pagePath = crawlUrl.replace(targetSite, path).replace(/\/$/gm,'');
    dirPath = pagePath.substring(0, pagePath.lastIndexOf('/'));
    fs.promises.mkdir(dirPath, { recursive: true }).catch(console.error);

    //Store into local file
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    if (pagePath.replace(/\/$/gm,'') == path.replace(/\/$/gm,'')) {
        pagePath += "/index"
    }
    fs.writeFileSync(pagePath + ".html", data);

    for (let i = 0; i < hrefs.length; i++) {
        var re = new RegExp(`^${crawlUrl}`);
        var hash = new RegExp(`.*\#`);
        if (hrefs[i].match(re) !== null && hrefs[i].match(hash) === null) {
            if (vistedUrl.indexOf(hrefs[i]) === -1) {
                await crawlAll(hrefs[i], browser);
            }
        }
    }
}

module.exports = router;
