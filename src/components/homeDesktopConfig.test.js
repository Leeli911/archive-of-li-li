import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  getHomeIdentityCopy,
  getHomeSectionEntries,
  homeDesktopWindows,
} from "./homeDesktopConfig.js";

const homepageCss = readFileSync(new URL("../index.css", import.meta.url), "utf8");
const homeCanvasSource = readFileSync(new URL("./HomeCanvas.jsx", import.meta.url), "utf8");
const desktopWindowSource = readFileSync(new URL("./DesktopWindow.jsx", import.meta.url), "utf8");
const archiveEntrancesSource = readFileSync(
  new URL("./HomeArchiveEntrances.jsx", import.meta.url),
  "utf8",
);

const sections = [
  {
    id: "ai-products",
    label: "AI Products",
    labelZh: "AI 产品",
    detail: "AI products and workflows",
    detailZh: "AI 产品与工作流",
  },
  {
    id: "research",
    label: "Research",
    labelZh: "研究项目",
    detail: "Research projects",
    detailZh: "研究项目",
  },
  {
    id: "data-work",
    label: "Data Work",
    labelZh: "数据工作",
    detail: "Analytics practice",
    detailZh: "数据分析实践",
  },
  {
    id: "about",
    label: "About",
    labelZh: "关于我",
    detail: "Archive note",
    detailZh: "档案说明",
  },
  {
    id: "cv",
    label: "CV",
    labelZh: "履历",
    detail: "Formal dossier",
    detailZh: "正式履历",
  },
];

test("identity copy returns stable bilingual content", () => {
  const english = getHomeIdentityCopy("en");
  const chinese = getHomeIdentityCopy("zh");

  assert.deepEqual(english, {
    variant: "en",
    eyebrow: "AI portfolio",
    titleLines: ["The Archive", "of Li Li"],
    role: "Applied AI | AI Product & Evaluation",
    summary:
      "A living desktop archive of research, AI data products, evaluation systems, and visual computing projects.",
  });
  assert.deepEqual(chinese, {
    variant: "zh",
    eyebrow: "AI 作品集",
    titleLines: ["李莉的", "数字档案馆"],
    role: "应用 AI | AI 产品与评估",
    summary: "一个收集 AI 产品、数据工作、评估方法与研究项目的桌面档案。",
  });
});

test("section entries preserve archive order and bilingual labels", () => {
  const englishEntries = getHomeSectionEntries(sections, "en");
  const chineseEntries = getHomeSectionEntries(sections, "zh");

  assert.deepEqual(
    englishEntries.map((entry) => entry.id),
    ["ai-products", "research", "data-work", "about", "cv"],
  );
  assert.deepEqual(
    englishEntries.map((entry) => entry.index),
    ["01", "02", "03", "04", "05"],
  );
  assert.deepEqual(
    englishEntries.map((entry) => entry.label),
    ["AI Products", "Research", "Data Work", "About", "CV"],
  );
  assert.deepEqual(
    chineseEntries.map((entry) => entry.label),
    ["AI 产品", "研究项目", "数据工作", "关于我", "履历"],
  );
  assert.deepEqual(
    englishEntries.map((entry) => entry.detail),
    [
      "AI products and workflows",
      "Research projects",
      "Analytics practice",
      "Archive note",
      "Formal dossier",
    ],
  );
  assert.deepEqual(
    chineseEntries.map((entry) => entry.detail),
    ["AI 产品与工作流", "研究项目", "数据分析实践", "档案说明", "正式履历"],
  );
});

test("desktop windows are stable, non-random, and match sections", () => {
  assert.deepEqual(homeDesktopWindows, [
    {
      id: "ai-product-window",
      sectionId: "ai-products",
      chromeTitle: "ai product",
      headline: "BUILD",
      tone: "pink",
      layoutClass: "desktop-window--ai-products",
      draggable: false,
      randomized: false,
    },
    {
      id: "research-window",
      sectionId: "research",
      chromeTitle: "research note",
      headline: "LOOKING",
      tone: "gray",
      layoutClass: "desktop-window--research",
      draggable: false,
      randomized: false,
    },
    {
      id: "data-work-window",
      sectionId: "data-work",
      chromeTitle: "metrics",
      headline: "ANSWER",
      tone: "blue",
      layoutClass: "desktop-window--data-work",
      draggable: false,
      randomized: false,
    },
    {
      id: "about-window",
      sectionId: "about",
      chromeTitle: "archive note",
      headline: "ME",
      tone: "paper",
      layoutClass: "desktop-window--about",
      draggable: false,
      randomized: false,
    },
    {
      id: "cv-window",
      sectionId: "cv",
      chromeTitle: "formal dossier",
      headline: "CV",
      tone: "pink",
      layoutClass: "desktop-window--cv",
      draggable: false,
      randomized: false,
    },
  ]);
});

test("homepage CSS keeps a full-bleed flowing desktop stage", () => {
  const homeDesktopBlock = homepageCss.match(/\.home-desktop\s*\{[^}]+\}/)?.[0] || "";
  const reducedMotionBlock =
    homepageCss.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]+\n\}/)?.[0] || "";

  assert.match(homeDesktopBlock, /width:\s*100%/);
  assert.doesNotMatch(homeDesktopBlock, /content-max/);
  assert.match(homepageCss, /@keyframes\s+homeReveal/);
  assert.match(homepageCss, /@keyframes\s+windowReveal/);
  assert.match(homepageCss, /\.desktop-window[^{]+\{[^}]*animation:/);
  assert.match(homepageCss, /\.home-archive-chip[^{]+\{[^}]*animation:/);
  assert.match(reducedMotionBlock, /animation:\s*none/);
});

test("homepage removes the random digit canvas and keeps a single Chinese-inspired texture", () => {
  const homePatternBlock =
    homepageCss.match(/\.home-canvas-section::before\s*\{[^}]+\}/)?.[0] || "";

  assert.doesNotMatch(homeCanvasSource, /<canvas/);
  assert.doesNotMatch(homeCanvasSource, /Math\.random|requestAnimationFrame|digitSeedText/);
  assert.doesNotMatch(homepageCss, /\.home-canvas\s*\{/);
  assert.match(homepageCss, /--home-haitang-pattern:/);
  assert.match(homePatternBlock, /var\(--home-haitang-pattern\)/);
  assert.doesNotMatch(homePatternBlock, /repeating-radial-gradient/);
});

test("homepage modules surface on hover and expose stable section targets", () => {
  const hoverBlock =
    homepageCss.match(
      /\.desktop-window:hover,\s*\.desktop-window:focus-visible,\s*\.desktop-window\.is-active\s*\{[^}]+\}/,
    )?.[0] || "";
  const noteBlock =
    homepageCss.match(/\.home-identity__note\s*\{[^}]+\}/)?.[0] || "";

  assert.match(desktopWindowSource, /data-section-id=\{section\.id\}/);
  assert.match(archiveEntrancesSource, /data-section-id=\{entry\.id\}/);
  assert.match(hoverBlock, /z-index:\s*30/);
  assert.match(noteBlock, /rgba\(244,\s*239,\s*228,\s*0\.1[0-9]\)/);
  assert.doesNotMatch(noteBlock, /backdrop-filter/);
});

test("homepage visual layer stays light, small-scaled, rounded, and bubble-like", () => {
  const homeSectionBlock =
    homepageCss.match(/\.home-canvas-section\s*\{[^}]+\}/)?.[0] || "";
  const homePatternBlock =
    homepageCss.match(/\.home-canvas-section::before\s*\{[^}]+\}/)?.[0] || "";
  const homeVignetteBlock =
    homepageCss.match(/\.home-vignette\s*\{[^}]+\}/)?.[0] || "";
  const homeVignetteInsetBlock =
    homepageCss.match(/\.home-vignette::before\s*\{[^}]+\}/)?.[0] || "";
  const identityBlock = homepageCss.match(/\.home-identity\s*\{[^}]+\}/)?.[0] || "";
  const noteBlock =
    homepageCss.match(/\.home-identity__note\s*\{[^}]+\}/)?.[0] || "";
  const homeDesktopBlock = homepageCss.match(/\.home-desktop\s*\{[^}]+\}/)?.[0] || "";
  const windowBlock = homepageCss.match(/\.desktop-window\s*\{[^}]+\}/)?.[0] || "";
  const windowAfterBlock =
    homepageCss.match(/\.desktop-window::after\s*\{[^}]+\}/)?.[0] || "";
  const windowBeforeBlock =
    homepageCss.match(/\.desktop-window::before\s*\{[^}]+\}/)?.[0] || "";
  const windowChromeBlock =
    homepageCss.match(/\.desktop-window__chrome\s*\{[^}]+\}/)?.[0] || "";
  const windowSectionBlock =
    homepageCss.match(/\.desktop-window__section\s*\{[^}]+\}/)?.[0] || "";
  const windowHoverBlock =
    homepageCss.match(
      /\.desktop-window:hover,\s*\.desktop-window:focus-visible,\s*\.desktop-window\.is-active\s*\{[^}]+\}/,
    )?.[0] || "";
  const chipBlock = homepageCss.match(/\.home-archive-chip\s*\{[^}]+\}/)?.[0] || "";
  const homepageAnimationBlocks = [
    homePatternBlock,
    homeDesktopBlock,
    windowBlock,
    chipBlock,
  ].join("\n");

  assert.match(homeSectionBlock, /background:[\s\S]*var\(--paper\)/);
  assert.doesNotMatch(homeSectionBlock, /#fffdfa|255,\s*253,\s*248/);
  assert.match(homePatternBlock, /background-size:\s*18px\s+18px,\s*100%\s+100%/);
  assert.match(homePatternBlock, /border-radius:\s*clamp\(3\.6rem/);
  assert.doesNotMatch(homePatternBlock, /border:/);
  assert.doesNotMatch(homeVignetteBlock, /border:|inset\s+0\s+0\s+0\s+1px/);
  assert.equal(homeVignetteInsetBlock, "");
  assert.match(identityBlock, /z-index:\s*3/);
  assert.match(noteBlock, /border-radius:\s*0\.72rem/);
  assert.match(noteBlock, /pointer-events:\s*none/);
  assert.doesNotMatch(noteBlock, /border:|border-left:/);
  assert.doesNotMatch(windowBlock, /border:/);
  assert.match(windowBlock, /border-radius:\s*50%/);
  assert.match(windowBlock, /clip-path:\s*ellipse\(50%\s+50%\s+at\s+50%\s+50%\)/);
  assert.match(windowBlock, /rgba\(252,\s*251,\s*248,\s*0\.4[0-9]\)/);
  assert.match(windowBlock, /inset\s+0\s+1px\s+0\s+rgba\(255,\s*255,\s*255/);
  assert.match(windowBeforeBlock, /background:\s*var\(--bubble-fill\)/);
  assert.match(windowAfterBlock, /radial-gradient\(circle at 22%\s+18%/);
  assert.match(windowChromeBlock, /border-bottom:\s*0/);
  assert.match(windowChromeBlock, /background:\s*transparent/);
  assert.doesNotMatch(windowSectionBlock, /border:/);
  assert.doesNotMatch(windowHoverBlock, /border-color/);
  assert.match(chipBlock, /border:\s*1px\s+solid\s+rgba\(35,\s*32,\s*30,\s*0\.16\)/);
  assert.match(chipBlock, /border-radius:\s*0\.48rem/);
  assert.match(chipBlock, /rgba\(255,\s*255,\s*255,\s*0\.76\)/);
  assert.doesNotMatch(homepageCss, /homeBreath|windowDrift|chipFloat/);
  assert.doesNotMatch(homepageAnimationBlocks, /infinite/);
});
