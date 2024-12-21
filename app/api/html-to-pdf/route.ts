import chromium from "@sparticuz/chromium-min";
import { NextRequest } from "next/server";
import path from "path";
import puppeteer from "puppeteer-core";

async function getBrowser() {
  return puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    // await chromium.executablePath(
      // path.resolve(process.cwd(),'lib/chromium-v131.0.1-pack.tar'),
      // "https://github.com/Sparticuz/chromium/releases/download/v129.0.0/chromium-v129.0.0-pack.tar"
    // ),
    headless: chromium.headless,
    // args: [
    //     '--no-sandbox',
    //     '--disable-setuid-sandbox',
    //     '--font-render-hinting=none'
    // ],
    // headless:true
  });
}

export async function POST(request: NextRequest) {
  try {
    const { html } = await request.json();

    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" }
    });
    await browser.close();
    console.log("Operation successfully")

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="output.pdf"'
      }
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}