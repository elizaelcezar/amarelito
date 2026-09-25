/* Testes de usabilidade automatizados (mobile + desktop).
 * Uso: node scripts/usability.mjs   (requer dev server em http://localhost:3000)
 * Screenshots e relatório em reports/ux/
 */
import puppeteer from "puppeteer-core";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = path.resolve("reports/ux");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const VIEWPORTS = [
  { name: "mobile-small", width: 360, height: 640, isMobile: true },
  { name: "mobile", width: 390, height: 844, isMobile: true },
  { name: "tablet", width: 768, height: 1024, isMobile: false },
  { name: "desktop", width: 1440, height: 900, isMobile: false },
];

const ROUTES = [
  { key: "home", path: "/" },
  { key: "produtos", path: "/produtos" },
  { key: "produto", path: "/produtos/polpa-de-morango" },
  { key: "produto-maionese", path: "/produtos/maionese-artesanal" },
  { key: "carrinho", path: "/carrinho" },
  { key: "assinatura", path: "/assinatura" },
  { key: "lancamento", path: "/lancamento" },
];

mkdirSync(OUT, { recursive: true });

const problems = [];
const results = [];

function note(sev, where, msg) {
  problems.push({ sev, where, msg });
  console.log(`[${sev}] ${where}: ${msg}`);
}

async function measure(page, routeKey, vp) {
  const data = await page.evaluate(() => {
    const doc = document.documentElement;
    const interactive = [...document.querySelectorAll("a, button, input, select, summary")];
    const small = interactive
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { tag: el.tagName, text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 40), w: Math.round(r.width), h: Math.round(r.height) };
      })
      .filter((r) => r.w > 0 && r.h > 0 && (r.w < 44 || r.h < 44));
    return {
      scrollHeight: doc.scrollHeight,
      scrollWidth: doc.scrollWidth,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      smallTargets: small,
    };
  });

  const screens = +(data.scrollHeight / data.innerHeight).toFixed(2);
  const overflowX = data.scrollWidth > data.innerWidth + 1;
  const where = `${routeKey}@${vp.name}`;
  if (overflowX) note("ERRO", where, `overflow horizontal: scrollWidth=${data.scrollWidth} > ${data.innerWidth}`);
  if (screens > 1.15) note("INFO", where, `${screens} telas de rolagem`);
  if (vp.isMobile && data.smallTargets.length > 0) {
    const worst = data.smallTargets.slice(0, 5).map((t) => `${t.tag}"${t.text}" ${t.w}x${t.h}`).join(", ");
    note("AVISO", where, `${data.smallTargets.length} alvos <44px (ex.: ${worst})`);
  }

  const shot = path.join(OUT, `${routeKey}-${vp.name}.png`);
  await page.screenshot({ path: shot, fullPage: true });
  results.push({ route: routeKey, viewport: vp.name, screens, overflowX, smallTargets: data.smallTargets.length, shot: path.basename(shot) });
}

async function runFlow(browser, vp) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile, hasTouch: vp.isMobile });
  const where = `fluxo@${vp.name}`;
  try {
    await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: "networkidle0" });
    // home → tile de categoria
    await page.click('a[href="/produtos?categoria=polpas"]');
    await page.waitForSelector('a[href="/produtos/polpa-de-morango"]', { timeout: 10000 });
    // produto → adicionar
    await page.goto(`${BASE}/produtos/polpa-de-morango`, { waitUntil: "networkidle0" });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(300);
    const addBtn = await page.waitForFunction(() => {
      const btns = [...document.querySelectorAll("button")];
      return btns.find((b) => b.offsetParent && /adicionar|assinar e adicionar/i.test(b.textContent)) ?? null;
    }, { timeout: 10000 });
    await addBtn.asElement().click();
    await page.waitForFunction(() => {
      const btns = [...document.querySelectorAll("button")];
      return btns.some((b) => /ir pro carrinho/i.test(b.textContent));
    }, { timeout: 10000 });
    note("OK", where, "produto → adicionar → ir pro carrinho");
    // carrinho: converter avulso → assinatura? (produto já entra como semanal)
    await page.click('a[href="/carrinho"]');
    await page.waitForSelector("text=Carrinho", { timeout: 10000 });
    const hasItem = await page.evaluate(() => document.body.innerText.includes("Polpa de Morango"));
    if (!hasItem) note("ERRO", where, "item não apareceu no carrinho");
    else note("OK", where, "item presente no carrinho");

    // adiciona um item AVULSO e tenta converter para assinatura
    await page.goto(`${BASE}/produtos/farofa-de-bacon`, { waitUntil: "networkidle0" });
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll("button")];
      const avulso = btns.find((b) => /^Avulso/.test(b.textContent.trim()));
      avulso?.click();
    });
    await sleep(300);
    const addedAvulso = await page.evaluate(() => {
      const btns = [...document.querySelectorAll("button")];
      const add = btns.find((b) => b.offsetParent && /adicionar ao carrinho/i.test(b.textContent));
      add?.click();
      return Boolean(add);
    });
    if (!addedAvulso) note("ERRO", where, "não consegui adicionar item avulso");
    await sleep(300);
    await page.goto(`${BASE}/carrinho`, { waitUntil: "networkidle0" });
    await sleep(500);
    const convert = await page.evaluate(() => {
      const el = [...document.querySelectorAll("button, a")].find((b) => /assinar|semanal -10|semanal/i.test(b.textContent) && /farofa/i.test(b.closest("li")?.innerText ?? ""));
      return el?.textContent?.trim() ?? null;
    });
    if (convert) note("OK", where, `chance de assinatura visível no carrinho: "${convert.replace(/\s+/g, " ")}"`);
    else note("ERRO", where, "item avulso sem opção de assinatura no carrinho");

    // executa a conversão e confere o resultado
    const converted = await page.evaluate(() => {
      const lis = [...document.querySelectorAll("li")];
      const farofa = lis.find((li) => /farofa/i.test(li.innerText));
      if (!farofa) return false;
      const chip = [...farofa.querySelectorAll("button")].find((b) => /semanal/i.test(b.textContent));
      chip?.click();
      return Boolean(chip);
    });
    await sleep(400);
    const after = await page.evaluate(() => {
      const lis = [...document.querySelectorAll("li")];
      const farofa = lis.find((li) => /farofa/i.test(li.innerText));
      return farofa ? { text: farofa.innerText, hasRevert: /virar avulso/i.test(farofa.innerText) } : null;
    });
    if (converted && after?.hasRevert) note("OK", where, "conversão avulso → semanal funcionou");
    else note("ERRO", where, `conversão falhou: ${JSON.stringify(after)}`);

    // formulário → URL do WhatsApp
    await page.evaluate(() => {
      window.open = (url) => { window.__wa = url; return null; };
      const setReact = (el, value) => {
        const proto = el.tagName === "SELECT" ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      };
      const nome = [...document.querySelectorAll('input[type="text"]')].find((i) => !i.placeholder.includes("Rua"));
      if (nome) setReact(nome, "Teste UX");
      const bairro = [...document.querySelectorAll("select")].find((s) => s.options.length > 1);
      if (bairro) setReact(bairro, bairro.options[1].value);
      const rua = [...document.querySelectorAll('input[type="text"]')].find((i) => i.placeholder.includes("Rua"));
      if (rua) setReact(rua, "Rua Teste, 100");
      document.querySelector("form")?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    await sleep(300);
    const wa = await page.evaluate(() => window.__wa ?? null);
    if (wa && wa.startsWith("https://wa.me/")) note("OK", where, `URL WhatsApp gerada (${wa.length} chars)`);
    else note("ERRO", where, `URL WhatsApp não gerada: ${wa}`);
  } catch (err) {
    note("ERRO", where, `fluxo falhou: ${err.message}`);
  } finally {
    await page.close();
  }
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "shell", args: ["--no-sandbox"] });
try {
  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile, hasTouch: vp.isMobile });
      try {
        await page.goto(BASE + route.path, { waitUntil: "networkidle0", timeout: 30000 });
        await sleep(400);
        await measure(page, route.key, vp);
      } catch (err) {
        note("ERRO", `${route.key}@${vp.name}`, err.message);
      } finally {
        await page.close();
      }
    }
  }
  await runFlow(browser, VIEWPORTS[1]); // fluxo no mobile padrão
  await runFlow(browser, VIEWPORTS[3]); // fluxo no desktop
} finally {
  await browser.close();
}

writeFileSync(path.join(OUT, "report.json"), JSON.stringify({ results, problems }, null, 2));
const erros = problems.filter((p) => p.sev === "ERRO").length;
console.log(`\n=== ${results.length} páginas medidas | ${erros} erros | relatório em reports/ux/report.json ===`);
process.exit(erros > 0 ? 1 : 0);
