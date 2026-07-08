import assert from "node:assert/strict";
import test from "node:test";
import {
  getHomeIdentityCopy,
  getHomeSectionEntries,
  homeDesktopWindows,
} from "./homeDesktopConfig.js";

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

test("identity copy uses separate English and Chinese line metrics", () => {
  const english = getHomeIdentityCopy("en");
  const chinese = getHomeIdentityCopy("zh");

  assert.deepEqual(english.titleLines, ["The Archive", "of Li Li"]);
  assert.deepEqual(chinese.titleLines, ["李莉的", "数字档案馆"]);
  assert.equal(english.variant, "en");
  assert.equal(chinese.variant, "zh");
  assert.notEqual(english.role, chinese.role);
  assert.ok(english.summary.length > 40);
  assert.ok(chinese.summary.length > 12);
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
  assert.equal(englishEntries[0].label, "AI Products");
  assert.equal(chineseEntries[0].label, "AI 产品");
  assert.equal(chineseEntries[2].detail, "数据分析实践");
});

test("desktop windows are stable, non-random, and match sections", () => {
  const windowIds = homeDesktopWindows.map((windowConfig) => windowConfig.sectionId);

  assert.deepEqual(windowIds, sections.map((section) => section.id));

  homeDesktopWindows.forEach((windowConfig) => {
    assert.match(windowConfig.id, /^[a-z0-9-]+$/);
    assert.match(windowConfig.chromeTitle, /^[a-z0-9 /.-]+$/);
    assert.ok(["pink", "gray", "blue", "paper"].includes(windowConfig.tone));
    assert.equal(windowConfig.draggable, false);
    assert.equal(windowConfig.randomized, false);
    assert.ok(windowConfig.layoutClass.startsWith("desktop-window--"));
  });
});
