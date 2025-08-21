import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

// oauth-abw_refresh_token
// oauth-abw_church_account_id

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const BROWSERLESS_API = process.env.BROWSERLESS_API;
  const { username } = req.body;
  const { password } = req.body;
  const browser = await puppeteer.connect({
    browserWSEndpoint: BROWSERLESS_API,
  });

  try {
    if (username && password) {
      const page = await browser.newPage();
      await page.goto("https://referralmanager.churchofjesuschrist.org/");

      await page.waitForSelector("#username-input", { visible: true, timeout: 3000 });
      await page.type("#username-input", String(username));
      await page.waitForSelector("#button-primary", {
        visible: true,
      });
      await page.click("#button-primary");
      await page.waitForSelector("#password-input", { visible: true, timeout: 3000 });
      await page.type("#password-input", String(password));
      await page.waitForSelector("#button-primary", {
        visible: true,
      });
      await page.click("#button-primary");
      await page.waitForResponse((response) => response.url().includes("state") && response.status() === 200);

      const cookies = await browser.cookies();

      if (cookies) {
        res.status(200).json(cookies);
      } else {
        res.status(404).json({ message: "No cookies found" });
      }
    } else {
      res.status(404).json({ message: "No username or password found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  } finally {
    if (browser.disconnect) browser.disconnect(); // safer for remote browser connections
  }
};
