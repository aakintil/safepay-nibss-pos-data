/**
 * @name get text value of an element
 *
 * @desc Gets the text value of an element by using the page.$eval method
 * https://scotch.io/tutorials/nodejs-cron-jobs-by-examples
 * @TODOs
 * - need to find a way to save the data
 * - need to ensure cron job is running at a specific time
 * - need to push node code to heroku
 */
const mongoose = require('mongoose');
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
require('./models');


app = express();

cron.schedule('56 23 * * *', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();

    await page.setJavaScriptEnabled(true);

    await page.setViewport({ width: 1024, height: 400 });

    await page.goto("https://traf.nibss-plc.com.ng:7443/traf/website?data=POS");

    await page.waitFor(20000);

    const content = await page.content().then( async (html) => {
      console.log("getting the content ");
      const $ = cheerio.load(html);
      const row = $(".row:nth-child(3)");
      const todayTxnVol = $("#todayTxnVolOutward").text();
      const todayVolFailedTransactions = $("#todayTxnVolFailedOutward").text();
      const todayFailureRate = $("#todayFailureRateOutward").text();
      const todayAvgProcessingTime = $("#todayProcessingTimeOutward").text();
      const todaySuccessPercentage = $("#todaySucccessOutward").text();
      const todaySuccessVolOutward = $("#todaySucccessVolOutward").text();
      const todayProcessorsErrorPercentage = $(
        "#todayErrorProcessorOutward"
      ).text();
      const todayProcessorsErrorVol = $(
        "#todayErrorVolProcessorOutward"
      ).text();
      const todayCustomerErrorPercentage = $(
        "#todayErrorCustomerOutward"
      ).text();
      const todayCustomerErrorVol = $("#todayErrorVolCustomerOutward").text();
      const todayIssuerErrorPercentage = $(
        "#todayErrorIssuerSwitchOutward"
      ).text();
      const todayIssuerErrorVol = $("#todayErrorVolIssuerSwitchOutward").text();
      const todayAcquireBankErrorPercentage = $(
        "#todayErrorBankOutward"
      ).text();
      const todayAcquireBankErrorVol = $("#todayErrorVolBankOutward").text();
      const todaySecurityErrorPercentage = $(
        "#todayErrorSecurityOutward"
      ).text();
      const todaySecurityErrorVol = $("#todayErrorVolSecurityOutward").text();
      const todayNibssErrorPercentage = $("#todayErrorNibssOutward").text();
      const todayNibssErrorVol = $("#todayErrorVolNibssOutward").text();
      const todayOtherErrorPercentage = $("#todayErrorOthersOutward").text();
      const todayOtherErrorVol = $("#todayErrorVolOthersOutward").text();

      const obj = {
        todayTxnVol,
        todayVolFailedTransactions,
        todayFailureRate,
        todayAvgProcessingTime,
        success: {
          todaySuccessPercentage,
          todaySuccessVolOutward,
        },
        processorsError: {
          todayProcessorsErrorPercentage,
          todayProcessorsErrorVol,
        },
        customerError: {
          todayCustomerErrorPercentage,
          todayCustomerErrorVol,
        },
        issuerError: {
          todayIssuerErrorPercentage,
          todayIssuerErrorVol,
        },
        acquireBankError: {
          todayAcquireBankErrorPercentage,
          todayAcquireBankErrorVol,
        },
        securityError: {
          todaySecurityErrorPercentage,
          todaySecurityErrorVol,
        },
        nibssError: {
          todayNibssErrorPercentage,
          todayNibssErrorVol,
        },
        otherError: {
          todayOtherErrorPercentage,
          todayOtherErrorVol,
        },
      };

      const transaction = new (mongoose.model('Transactions'))(obj);
      await transaction.save()
    });
  } catch (err) {
    console.error(err.message);
  } finally {
    await browser.close();
  }
});

app.listen(3128);
