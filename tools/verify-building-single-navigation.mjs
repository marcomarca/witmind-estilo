import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const screenshotsDir = path.resolve("artifacts", "screenshots");
fs.mkdirSync(screenshotsDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

const resolutions = [
  { name: "desktop-1440x900", width: 1440, height: 900, isMobile: false },
  { name: "laptop-1366x768", width: 1366, height: 768, isMobile: false },
  { name: "tablet-1024x768", width: 1024, height: 768, isMobile: false },
  { name: "narrow-820x900", width: 820, height: 900, isMobile: false },
  { name: "mobile-390x844", width: 390, height: 844, isMobile: true },
  { name: "mobile-375x812", width: 375, height: 812, isMobile: true },
];

console.log("Iniciando suite de verificación E2E de navegación unificada...");

for (const res of resolutions) {
  const themes = (res.name.includes("1440") || res.name.includes("390")) ? ["dark", "light"] : ["dark"];
  for (const theme of themes) {
    const page = await browser.newPage({
      viewport: { width: res.width, height: res.height },
      isMobile: res.isMobile,
      hasTouch: res.isMobile,
    });

    await page.goto("http://127.0.0.1:5174/", { waitUntil: "domcontentloaded" });
    await page.evaluate(({ width, height }) => {
      document.body.style.margin = "0";
      document.body.innerHTML = `<iframe id="panel" src="/witmind-ui.html?single-nav-test=1" style="display:block;width:${width}px;height:${height}px;border:0"></iframe>`;
    }, res);

    const frame = page.frameLocator("#panel");
    await frame.locator("witmind-ui-app").waitFor();

    // Inyectar INIT para panel general en modo host
    await page.evaluate(({ theme, isMobile }) => {
      const child = document.querySelector("#panel")?.contentWindow;
      child?.postMessage({
        protocol: 1,
        source: "witmind-ha",
        type: "WITMIND_INIT",
        panelConfig: { panel_id: "general", panel_kind: "general", title: "Control de Edificio" },
        narrow: isMobile,
        theme,
        user: { is_admin: true, name: "QA Auditor" },
      }, "*");
    }, { theme, isMobile: res.isMobile });

    await page.waitForTimeout(300);

    const buildingPanel = frame.locator("witmind-ui-app").locator("witmind-workspace").locator("witmind-building-panel");
    await buildingPanel.waitFor();

    // 1. Asserts de DOM
    const domAsserts = await buildingPanel.evaluate((el) => {
      const root = el.shadowRoot;
      const workspace = el.closest("witmind-workspace") || el.getRootNode().host;
      const wsRoot = workspace?.shadowRoot;

      const sidebarCount = root?.querySelectorAll("aside.sidebar").length || 0;
      const sectionNavCount = root?.querySelectorAll("nav.section-nav").length || 0;
      const navButtons = Array.from(root?.querySelectorAll("nav.section-nav button") || []).map((b) => b.textContent?.trim());
      const articles = ["floor-plan", "circuits", "alerts", "environment", "consumption"].map((id) => ({
        id,
        count: root?.querySelectorAll(`#${id}`).length || 0,
      }));
      const pagesCount = wsRoot?.querySelectorAll(".page").length || 0;
      const navHidden = wsRoot?.querySelector(".workspace-nav")?.classList.contains("is-hidden") ||
        (wsRoot?.querySelector(".workspace-nav")?.innerHTML.trim() === "");

      return {
        sidebarCount,
        sectionNavCount,
        navButtons,
        articles,
        pagesCount,
        navHidden,
      };
    });

    if (domAsserts.sidebarCount !== 0) {
      throw new Error(`[${res.name}-${theme}] Error DOM: aside.sidebar presente (count=${domAsserts.sidebarCount})`);
    }
    if (domAsserts.sectionNavCount !== 1) {
      throw new Error(`[${res.name}-${theme}] Error DOM: nav.section-nav no encontrada o duplicada (count=${domAsserts.sectionNavCount})`);
    }
    const expectedButtons = ["Plano", "Circuitos", "Ambiente", "Alarmas", "Consumo"];
    if (JSON.stringify(domAsserts.navButtons) !== JSON.stringify(expectedButtons)) {
      throw new Error(`[${res.name}-${theme}] Error DOM: botones de section-nav inesperados: ${JSON.stringify(domAsserts.navButtons)}`);
    }
    for (const art of domAsserts.articles) {
      if (art.count !== 1) {
        throw new Error(`[${res.name}-${theme}] Error DOM: artículo #${art.id} tiene count=${art.count} (esperado 1)`);
      }
    }
    if (domAsserts.pagesCount !== 1) {
      throw new Error(`[${res.name}-${theme}] Error DOM: workspace host debe tener exactamente 1 .page (count=${domAsserts.pagesCount})`);
    }
    if (!domAsserts.navHidden) {
      throw new Error(`[${res.name}-${theme}] Error DOM: workspace-nav debe estar oculta o vacía en host`);
    }

    // 2. Asserts de Geometría
    const geom = await buildingPanel.evaluate((el) => {
      const root = el.shadowRoot;
      const bmsShell = root?.querySelector(".bms-shell")?.getBoundingClientRect();
      const topbar = root?.querySelector(".topbar")?.getBoundingClientRect();
      const sectionNav = root?.querySelector(".section-nav")?.getBoundingClientRect();
      const grid = root?.querySelector(".dashboard-grid")?.getBoundingClientRect();
      const host = el.getBoundingClientRect();
      const wsPage = el.closest(".page");

      return {
        hostWidth: host.width,
        shellWidth: bmsShell?.width || 0,
        gridLeft: (grid?.left || 0) - (host.left || 0),
        gridWidth: grid?.width || 0,
        topbarHeight: topbar?.height || 0,
        sectionNavHeight: sectionNav?.height || 0,
        pageScrollWidth: wsPage?.scrollWidth || 0,
        pageClientWidth: wsPage?.clientWidth || 0,
      };
    });

    if (geom.pageScrollWidth > geom.pageClientWidth + 1) {
      throw new Error(`[${res.name}-${theme}] Error Geometría: desbordamiento horizontal en .page (scrollWidth=${geom.pageScrollWidth} > clientWidth=${geom.pageClientWidth})`);
    }

    // Comprobar que dashboard-grid no tiene reserva de sidebar (comienza cerca del borde izquierdo, margin/padding <= 24px)
    if (geom.gridLeft > 24) {
      throw new Error(`[${res.name}-${theme}] Error Geometría: gridLeft=${geom.gridLeft} indica columna reservada para sidebar`);
    }

    // 3. Probar los cinco botones de ancla y verificar visibilidad bajo cabecera+tira sticky
    const buttonTargets = [
      { text: "Plano", id: "floor-plan" },
      { text: "Circuitos", id: "circuits" },
      { text: "Ambiente", id: "environment" },
      { text: "Alarmas", id: "alerts" },
      { text: "Consumo", id: "consumption" },
    ];

    for (const btn of buttonTargets) {
      const navBtn = buildingPanel.locator(`nav.section-nav button:has-text("${btn.text}")`);
      await navBtn.click();
      await page.waitForTimeout(300);

      const targetCheck = await buildingPanel.evaluate((el, targetId) => {
        const root = el.shadowRoot;
        const target = root?.querySelector(`#${targetId}`);
        const targetTitle = target?.querySelector(".panel-title") || target?.querySelector(".panel-head") || target;
        const rect = targetTitle?.getBoundingClientRect();
        const topbar = root?.querySelector(".topbar")?.getBoundingClientRect();
        const nav = root?.querySelector(".section-nav")?.getBoundingClientRect();
        const stickyBottom = Math.max(topbar?.bottom || 0, nav?.bottom || 0);

        return {
          titleTop: rect?.top || 0,
          titleBottom: rect?.bottom || 0,
          stickyBottom,
          isVisible: (rect?.top || 0) >= (stickyBottom - 5),
        };
      }, btn.id);

      if (!targetCheck.isVisible) {
        throw new Error(`[${res.name}-${theme}] Botón ${btn.text} desplazó tarjeta debajo de sticky: titleTop=${targetCheck.titleTop} < stickyBottom=${targetCheck.stickyBottom}`);
      }
    }

    // Captura de pantalla para evidencia
    const screenshotPath = path.join(screenshotsDir, `nav-${res.name}-${theme}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });

    await page.close();
  }
}

console.log("✓ Asserts de DOM, geometría y cinco anclas pasaron en todas las resoluciones.");

// 4. Verificación de gestos en modo host
console.log("Probando inmunidad de gestos y autoridad Home Assistant en modo host...");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://127.0.0.1:5174/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    document.body.innerHTML = '<iframe id="panel" src="/witmind-ui.html?gestures-test=1" style="width:1440px;height:900px;border:0"></iframe>';
  });
  const frame = page.frameLocator("#panel");
  await frame.locator("witmind-ui-app").waitFor();

  // Iniciar en general
  await page.evaluate(() => {
    window.__panelChangeDispatched = 0;
    const child = document.querySelector("#panel")?.contentWindow;
    child?.addEventListener("witmind-panel-change", () => {
      window.__panelChangeDispatched += 1;
    });
    child?.postMessage({
      protocol: 1,
      source: "witmind-ha",
      type: "WITMIND_INIT",
      panelConfig: { panel_id: "general", panel_kind: "general" },
      theme: "dark",
      user: { is_admin: true, name: "QA" },
    }, "*");
  });
  await page.waitForTimeout(300);

  const workspace = frame.locator("witmind-workspace");
  const buildingPanel = workspace.locator("witmind-building-panel");

  // Arrastre horizontal fuera del plano (sobre el fondo o header)
  const topbar = buildingPanel.locator(".topbar");
  const topbarBox = await topbar.boundingBox();
  if (topbarBox) {
    await page.mouse.move(topbarBox.x + 300, topbarBox.y + 20);
    await page.mouse.down();
    await page.mouse.move(topbarBox.x + 50, topbarBox.y + 20, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(200);
  }

  // Verificar que el panel sigue siendo general y no disparó witmind-panel-change
  const hostCheck = await workspace.evaluate((ws) => ({
    activeId: ws._activeId,
    pagesCount: ws.shadowRoot?.querySelectorAll(".page").length,
    eventsCount: window.__panelChangeDispatched || 0,
  }));

  if (hostCheck.activeId !== "general" || hostCheck.eventsCount !== 0) {
    throw new Error(`Gesto en modo host alteró panel: ${JSON.stringify(hostCheck)}`);
  }

  // Verificar que el selector y swipe de plantas SÍ funciona dentro del plano
  const floorGround = await buildingPanel.evaluate((el) => el._activeFloor);
  const upperBtn = buildingPanel.locator(".floor-selector button:has-text('Planta Alta')");
  await upperBtn.click();
  await page.waitForTimeout(200);
  const floorUpper = await buildingPanel.evaluate((el) => el._activeFloor);
  if (floorGround !== "ground" || floorUpper !== "upper") {
    throw new Error(`Selector de plantas no respondió: ground=${floorGround}, upper=${floorUpper}`);
  }

  // Cambiar panel a 'offices' mediante INIT desde el padre
  await page.evaluate(() => {
    const child = document.querySelector("#panel")?.contentWindow;
    child?.postMessage({
      protocol: 1,
      source: "witmind-ha",
      type: "WITMIND_INIT",
      panelConfig: { panel_id: "offices", panel_kind: "offices" },
      theme: "dark",
      user: { is_admin: true, name: "QA" },
    }, "*");
  });
  await page.waitForTimeout(300);

  const officesMounted = await workspace.evaluate((ws) => ({
    activeId: ws._activeId,
    tag: ws.shadowRoot?.querySelector(".page")?.firstElementChild?.tagName.toLowerCase(),
  }));

  if (officesMounted.activeId !== "offices" || officesMounted.tag !== "witmind-operations-panel") {
    throw new Error(`INIT de cambio de panel no montó offices: ${JSON.stringify(officesMounted)}`);
  }

  await page.close();
}

console.log("✓ Inmunidad de gestos y autoridad única de Home Assistant verificadas con éxito.");

await browser.close();
console.log("Todas las verificaciones de Fase C finalizaron exitosamente.");
