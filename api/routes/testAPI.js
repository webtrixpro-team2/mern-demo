var express = require("express");
const chromium = require('chrome-aws-lambda');
const playwright = require('playwright-core');
var router = express.Router();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = '/var/www/design.webtrixpro.net/node/mern/downloaded/';

router.get("/", async function (req, res, next) {
    try {
        const response = await start()
        //Store into local file
        fs.writeFileSync(path + '/response.html', response);

        //Read From local file
        var file = fs.readFileSync(path +  '/response.html');
        res.send(file);
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
        var content = document.querySelector("body > div:nth-child(10) > div:nth-child(2) > div.col-md-8 > div").outerHTML;
        content += "<h4>Timeline of Events</h4>";
        content += document.querySelector("#innercontent > div.spaced").outerHTML;
        return content
    })
    await browser.close()
    return response;
}

module.exports = router;
