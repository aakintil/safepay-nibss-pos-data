/**
 * @name get text value of an element
 *
 * @desc Gets the text value of an element by using the page.$eval method
 *
 */
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
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

    const content = await page.content().then((html) => {
      console.log("getting the content ");
      const $ = cheerio.load(html);
      const row = $(".row:nth-child(3)");
      const todayTxnVol = $("#todayTxnVolOutward").text();
      const todayVolFailedTransactions = $("#todayTxnVolFailedOutward").text();
      const todayFailureRate = $("#todayFailureRateOutward").text();
      const todayAvgProcessingTime = $("#todayProcessingTimeOutward").text();
      const todaySuccessPercentage = $("#todaySucccessOutward").text();
      const todaySuccessVolOutward = $("#todaySucccessOutward").text();
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
      console.log(obj);

      // console.log( 'loook here ', $('.row:nth-child(2)'));
      for (let i = 0; i < row.length; i++) {
        // Since the URL is within the span element, we can use the find method
        // To get all span elements with the `s1` class that are contained inside the
        // pre element. We select the first such element we find (since we have seen that the first span
        // element contains the URL)
        const urlSpan = $(row[i]).find("tr");

        // We proceed, only if the element exists
        if (urlSpan) {
          // We wrap the span in `$` to create another cheerio instance of only the span
          // and use the `text` method to get only the text (ignoring the HTML)
          // of the span element
          const urlText = $(urlSpan).text();

          // We then print the text on to the console
          // console.log(urlText);
        }
      }
    });
  } catch (err) {
    console.error(err.message);
  } finally {
    await browser.close();
  }
})();
