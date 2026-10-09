import { browserHarness } from "./browser-harness.mjs";
const { page, close, outputUrl } = await browserHarness({ port: 5180 });
const out = outputUrl;
try {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:5180");
  await page.waitForLoadState("load");
  await page.screenshot({
    path: new URL("home-desktop.png", out).pathname,
    fullPage: true,
  });
  await page.goto("http://127.0.0.1:5180/#/company/openai?tab=relationships");
  await page.screenshot({
    path: new URL("relationships-desktop.png", out).pathname,
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:5180");
  await page.screenshot({
    path: new URL("home-mobile.png", out).pathname,
    fullPage: true,
  });
  await page.goto("http://127.0.0.1:5180/#/company/openai?tab=relationships");
  await page.screenshot({
    path: new URL("relationships-mobile.png", out).pathname,
    fullPage: true,
  });
  console.log(JSON.stringify({ errors }));
} finally {
  await close();
}
