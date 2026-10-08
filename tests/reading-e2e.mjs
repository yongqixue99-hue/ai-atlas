import { chromium } from "playwright";
import { expect } from "@playwright/test";
import { createServer } from "vite";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

const server = await createServer({server:{host:"127.0.0.1",port:5186,strictPort:true}});
await server.listen();
const browser = await chromium.launch();
const page = await browser.newPage({viewport:{width:1440,height:1000}, reducedMotion:"reduce"});
const out = process.env.ATLAS_QA_DIR || new URL("../docs/qa/", import.meta.url).pathname;
const errors = [], passed = [], measurements = [];
page.on("pageerror", e=>errors.push(e.message));
page.on("response", r=>{if(r.url().startsWith("http://127.0.0.1") && r.status()>=400) errors.push(`${r.status()} ${r.url()}`);});
async function goto(id) {
  await page.goto(`http://127.0.0.1:5186/#/person/${id}`);
  await page.waitForFunction(()=>document.documentElement.dataset.route===location.hash);
  await page.evaluate(()=>document.fonts.ready);
}
try {
  await fs.mkdir(out,{recursive:true});
  await goto("bret-taylor");
  const control = page.locator("[data-biographies]");
  await expect(control).toHaveCount(1);
  await expect(control).toHaveText("展开全文");
  const ids = (await control.getAttribute("aria-controls")).split(" ");
  assert.equal(ids.length, await page.locator(".biography-disclosure").count());
  for(const id of ids) await expect(page.locator(`#${id}`)).toHaveCount(1);
  assert.equal(await page.locator("#chapter-1 > header").evaluate(el=>getComputedStyle(el).borderTopWidth),"0px");
  assert.equal(await page.locator("#chapter-1 > header").evaluate(el=>getComputedStyle(el).paddingTop),"0px");
  await control.click();
  await expect(control).toHaveText("收起全文");
  await expect(control).toHaveAttribute("aria-expanded","true");
  await expect(page.locator(".biography-disclosure[open]")).toHaveCount(ids.length);
  await page.locator("#biography-2 > summary").click();
  await expect(control).toHaveText("展开全文");
  await expect(control).toHaveAttribute("aria-expanded","false");
  await page.locator('.chapter-nav [data-jump="chapter-2"]').click();
  await expect(control).toHaveText("收起全文");
  await control.click();
  await expect(page.locator(".biography-disclosure[open]")).toHaveCount(0);
  await expect(control).toBeFocused();
  await expect(control).toHaveText("展开全文");
  await control.click();
  await page.locator('.wordmark').click();
  await page.goBack();
  await expect(page.locator("h1")).toHaveText("Bret Taylor");
  await expect(control).toHaveText("收起全文");
  passed.push("one synchronized whole-article control, individual toggles, contents jumps, focus and Back restoration");

  for(const theme of ["light","dark"]) {
    await page.emulateMedia({colorScheme:theme});
    for(const width of [1440,390,320]) {
      await page.setViewportSize({width,height:1000});
      for(const id of ["bret-taylor","fidji-simo","ilya-sutskever"]) {
        await goto(id);
        if(await control.getAttribute("data-biographies")==="expand") await control.click();
        const figure=page.locator(".biography-figure");
        await figure.scrollIntoViewIfNeeded();
        await expect(figure.locator(".figure-print-credit")).toBeHidden();
        await expect(figure.locator(".source-link")).toHaveCount(0);
        const source=figure.locator(".figure-source");
        await expect(source).toHaveCount(1);
        assert.equal(await source.evaluate(el=>el.parentElement.tagName),"P");
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${id} ${width} ${theme}`);
        if(id==="bret-taylor" && theme==="light") measurements.push(await figure.evaluate((el,width)=>({width,figure:el.getBoundingClientRect().height,caption:el.querySelector("figcaption").getBoundingClientRect().height}),width));
        if(width!==320) await figure.screenshot({path:path.join(out,`reading-${id}-${theme}-${width===1440?"desktop":"mobile"}.png`)});
        await source.focus(); await page.keyboard.press("Enter");
        const dialog=page.getByRole("dialog");
        await expect(dialog.locator(".figure-attribution")).toBeVisible();
        assert.ok(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth));
        if(id==="bret-taylor" && width!==320) await page.screenshot({path:path.join(out,`reading-sources-${theme}-${width===1440?"desktop":"mobile"}.png`)});
        const focusable=dialog.locator('a,button');
        await focusable.last().focus();await page.keyboard.press("Tab");
        await expect(focusable.first()).toBeFocused();
        await page.keyboard.press("Escape");await expect(source).toBeFocused();
        await expect(figure).toBeVisible();
        await source.click();await page.getByRole("button",{name:"关闭",exact:true}).click();await expect(source).toBeFocused();
      }
      passed.push(`${theme} ${width}px: compact photo/diagram captions, complete attribution, keyboard/dismissal, no overflow`);
    }
  }
  await goto("bret-taylor");
  if(await control.getAttribute("data-biographies")==="collapse") await control.click();
  await expect(page.locator(".biography-disclosure[open]")).toHaveCount(0);
  await page.emulateMedia({media:"print"});
  await expect(page.locator(".figure-print-credit")).toBeVisible();
  await expect(page.locator(".figure-source")).toBeHidden();
  await expect(page.locator(".biography-more").last()).toBeVisible();
  passed.push("print exposes closed chapters and image attribution without interactive triggers");
  await page.emulateMedia({media:"screen"});
  await expect(page.locator(".biography-disclosure[open]")).toHaveCount(0);
  await expect(page.locator(".figure-print-credit")).toBeHidden();
  assert.deepEqual(errors,[]);
  const result={date:new Date().toISOString(),browser:browser.version(),passed,measurements,errors};
  await fs.writeFile(path.join(out,"reading-results.json"),JSON.stringify(result,null,2)+"\n");
  console.log(JSON.stringify(result,null,2));
}finally{await browser.close();await server.close();}
