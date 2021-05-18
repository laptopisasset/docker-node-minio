import express, { json, RequestHandler } from "express";
import puppeteer from "puppeteer";

const app = express();

app.use(json());

const screenShotHandler: RequestHandler<any, any, { url: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { url } = req.body;
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    console.log(screenshot);
    res.status(200).json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

app.post("/screenshot", screenShotHandler);

export default app;
