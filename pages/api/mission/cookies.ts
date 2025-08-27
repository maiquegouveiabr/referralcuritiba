import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import PQueue from "p-queue";

const BROWSERLESS_API = process.env.BROWSERLESS_API;
const queue = new PQueue({ concurrency: 1 }); // adjust based on capacity

async function handleLogin(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  const browser = await puppeteer.connect({ browserWSEndpoint: BROWSERLESS_API });
  let page;

  try {
    page = await browser.newPage();
    await page.goto("https://referralmanager.churchofjesuschrist.org/");

    await page.waitForSelector("#username-input", { visible: true, timeout: 10000 });
    await page.type("#username-input", String(username));
    await page.click("#button-primary");

    await page.waitForSelector("#password-input", { visible: true, timeout: 10000 });
    await page.type("#password-input", String(password));
    await page.click("#button-primary");

    await page.waitForResponse((response) => response.url().includes("state") && response.status() === 200, { timeout: 15000 });

    const cookies = await page.cookies();
    res.status(200).json(cookies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  } finally {
    if (page) await page.close();
    if (browser.disconnect) browser.disconnect();
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await queue.add(() => handleLogin(req, res));
};
