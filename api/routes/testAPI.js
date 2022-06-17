var express = require("express");
const chromium = require('chrome-aws-lambda');
const playwright = require('playwright-core');
var router = express.Router();
const { MongoClient } = require('mongodb');

router.get("/", async function (req, res, next) {
    try {
        const rr = await start()
        res.send(rr);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get("/style.css", async function (req, res, next) {
    try {
        const client = await MongoClient.connect(process.env.MONGO_URI);
        // define an empty query document
        const query = {};
        const db = client.db();
        const cssCollection = db.collection('css');
        const cursor = cssCollection.find(query)
        const result = await cursor.toArray()

        cssText = ""
        result.forEach(r => {
            cssText += r.css;
        });

        client.close();

        res.setHeader('content-type', 'text/css');
        res.send(cssText);

    } catch (err) {
        console.log(err)
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
    const page = await browser.newPage()
    await page.goto("https://www.worldometers.info/coronavirus/country/us")
    const response = await page.evaluate(() => {
        return document.querySelector("body > div:nth-child(10) > div:nth-child(2) > div.col-md-8 > div").outerHTML;
    })
    await browser.close()
    return response;
}

module.exports = router;
