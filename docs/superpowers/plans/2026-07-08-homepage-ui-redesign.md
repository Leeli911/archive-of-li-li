# Homepage UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage as a stable poetic desktop archive inspired by `whenwe.love`, with bilingual typography that never overlaps.

**Architecture:** Keep the existing `HomeCanvas` animation and `ArchiveOverlay` opening flow, but move homepage content into focused components: a pure config module, clickable desktop windows, a bilingual identity block, and archive entrance chips. Styling lives in the existing global CSS because the project already centralizes visual language there.

**Tech Stack:** React 18, Vite 5, plain CSS, Node built-in test runner (`node --test`), existing npm build pipeline.

---

## File Structure

- Create `src/components/homeDesktopConfig.js`: stable homepage copy, desktop window metadata, and section entry helpers. This is the only new pure logic file and is unit-tested.
- Create `src/components/homeDesktopConfig.test.js`: Node built-in tests for bilingual copy, section mapping, stable window metadata, and non-overlap guard values.
- Create `src/components/DesktopWindow.jsx`: keyboard-accessible browser-like window button for each archive section.
- Create `src/components/HomeIdentity.jsx`: bilingual title, role, and summary block with separate English and Chinese class hooks.
- Create `src/components/HomeArchiveEntrances.jsx`: stable bottom/stacked section chips that mirror the section open behavior.
- Modify `src/components/HomeCanvas.jsx`: remove the first-viewport flower map, keep the canvas, and compose the new desktop scene.
- Modify `src/index.css`: replace the current homepage hero/flower-map styles with stable desktop collage, bilingual typography, responsive/mobile rules, hover/focus states, and reduced-motion rules.
- Modify `package.json`: add `test:home` for the pure config tests.

## Task 1: Add Stable Homepage Config And Tests

**Files:**
- Create: `src/components/homeDesktopConfig.js`
- Create: `src/components/homeDesktopConfig.test.js`
- Modify: `package.json`

- [ ] **Step 1: Add the test script to `package.json`**

Modify the `scripts` object so it reads:

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test:home": "node --test src/components/homeDesktopConfig.test.js"
}
```

- [ ] **Step 2: Write the failing config tests**

Create `src/components/homeDesktopConfig.test.js` with:

```js
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
```

- [ ] **Step 3: Run tests to verify they fail**

Run:

```bash
npm run test:home
```

Expected: FAIL with a module-not-found error for `homeDesktopConfig.js`.

- [ ] **Step 4: Implement `homeDesktopConfig.js`**

Create `src/components/homeDesktopConfig.js` with:

```js
export const homeDesktopWindows = [
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
];

export function getHomeIdentityCopy(language) {
  if (language === "zh") {
    return {
      variant: "zh",
      eyebrow: "AI 作品集",
      titleLines: ["李莉的", "数字档案馆"],
      role: "应用 AI | AI 产品与评估",
      summary: "一个收集 AI 产品、数据工作、评估方法与研究项目的桌面档案。",
    };
  }

  return {
    variant: "en",
    eyebrow: "AI portfolio",
    titleLines: ["The Archive", "of Li Li"],
    role: "Applied AI | AI Product & Evaluation",
    summary:
      "A living desktop archive of research, AI data products, evaluation systems, and visual computing projects.",
  };
}

export function getHomeSectionEntries(sections, language) {
  return sections.map((section, index) => ({
    id: section.id,
    index: String(index + 1).padStart(2, "0"),
    label: language === "zh" ? section.labelZh : section.label,
    detail: language === "zh" ? section.detailZh : section.detail,
  }));
}
```

- [ ] **Step 5: Run config tests**

Run:

```bash
npm run test:home
```

Expected: PASS, with Node reporting 3 passing tests.

- [ ] **Step 6: Commit Task 1**

Run:

```bash
git add package.json src/components/homeDesktopConfig.js src/components/homeDesktopConfig.test.js
git commit -m "test: add stable homepage config"
```

## Task 2: Add Focused Homepage Components

**Files:**
- Create: `src/components/DesktopWindow.jsx`
- Create: `src/components/HomeIdentity.jsx`
- Create: `src/components/HomeArchiveEntrances.jsx`

- [ ] **Step 1: Create `DesktopWindow.jsx`**

Create `src/components/DesktopWindow.jsx` with:

```jsx
function DesktopWindow({
  activeSectionId,
  language,
  onOpenSection,
  section,
  windowConfig,
}) {
  if (!section) return null;

  const isActive = activeSectionId === section.id;
  const sectionLabel = language === "zh" ? section.labelZh : section.label;
  const sectionDetail = language === "zh" ? section.detailZh : section.detail;

  const handleOpen = (event) => {
    onOpenSection(section, {
      x: event.clientX || window.innerWidth / 2,
      y: event.clientY || window.innerHeight / 2,
    });
  };

  return (
    <button
      className={`desktop-window desktop-window--${windowConfig.tone} ${windowConfig.layoutClass} ${
        isActive ? "is-active" : ""
      }`}
      type="button"
      aria-label={`${sectionLabel}: ${sectionDetail}`}
      onClick={handleOpen}
    >
      <span className="desktop-window__chrome" aria-hidden="true">
        <span className="desktop-window__dot" />
        <span className="desktop-window__dot" />
        <span className="desktop-window__dot" />
        <span className="desktop-window__title">{windowConfig.chromeTitle}</span>
      </span>
      <span className="desktop-window__surface" aria-hidden="true">
        <span className="desktop-window__headline">{windowConfig.headline}</span>
        <span className="desktop-window__section">{sectionLabel}</span>
      </span>
    </button>
  );
}

export default DesktopWindow;
```

- [ ] **Step 2: Create `HomeIdentity.jsx`**

Create `src/components/HomeIdentity.jsx` with:

```jsx
import { getHomeIdentityCopy } from "./homeDesktopConfig";

function HomeIdentity({ language }) {
  const copy = getHomeIdentityCopy(language);

  return (
    <section className={`home-identity home-identity--${copy.variant}`} aria-labelledby="home-title">
      <p className="home-identity__eyebrow">{copy.eyebrow}</p>
      <h1 className="home-identity__title" id="home-title">
        {copy.titleLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h1>
      <div className="home-identity__note">
        <p className="home-identity__role">{copy.role}</p>
        <p className="home-identity__summary">{copy.summary}</p>
      </div>
    </section>
  );
}

export default HomeIdentity;
```

- [ ] **Step 3: Create `HomeArchiveEntrances.jsx`**

Create `src/components/HomeArchiveEntrances.jsx` with:

```jsx
import { getHomeSectionEntries } from "./homeDesktopConfig";

function HomeArchiveEntrances({ activeSectionId, language, onOpenSection, sections }) {
  const entries = getHomeSectionEntries(sections, language);

  return (
    <nav
      className="home-archive-entrances"
      aria-label={language === "zh" ? "首页档案入口" : "Homepage archive entrances"}
    >
      {entries.map((entry) => {
        const section = sections.find((item) => item.id === entry.id);
        const isActive = activeSectionId === entry.id;

        return (
          <button
            key={entry.id}
            className={`home-archive-chip ${isActive ? "is-active" : ""}`}
            type="button"
            onClick={(event) =>
              onOpenSection(section, {
                x: event.clientX || window.innerWidth / 2,
                y: event.clientY || window.innerHeight - 96,
              })
            }
          >
            <span>{entry.index}</span>
            <strong>{entry.label}</strong>
            <small>{entry.detail}</small>
          </button>
        );
      })}
    </nav>
  );
}

export default HomeArchiveEntrances;
```

- [ ] **Step 4: Run the production build to catch JSX/import errors**

Run:

```bash
npm run build
```

Expected: PASS. The new components are not imported yet, so the build should remain stable.

- [ ] **Step 5: Commit Task 2**

Run:

```bash
git add src/components/DesktopWindow.jsx src/components/HomeIdentity.jsx src/components/HomeArchiveEntrances.jsx
git commit -m "feat: add homepage desktop components"
```

## Task 3: Compose The Stable Desktop Scene In `HomeCanvas`

**Files:**
- Modify: `src/components/HomeCanvas.jsx`

- [ ] **Step 1: Update imports**

At the top of `src/components/HomeCanvas.jsx`, replace:

```jsx
import { useEffect, useRef } from "react";
import ArchiveFlowerMap from "./ArchiveFlowerMap";
```

with:

```jsx
import { useEffect, useRef } from "react";
import DesktopWindow from "./DesktopWindow";
import HomeArchiveEntrances from "./HomeArchiveEntrances";
import HomeIdentity from "./HomeIdentity";
import { homeDesktopWindows } from "./homeDesktopConfig";
```

- [ ] **Step 2: Add section lookup inside `HomeCanvas`**

Immediately after the `useRef` declarations in `HomeCanvas`, add:

```jsx
  const sectionById = sections.reduce((lookup, section) => {
    lookup[section.id] = section;
    return lookup;
  }, {});
```

- [ ] **Step 3: Replace the returned homepage content**

In `src/components/HomeCanvas.jsx`, replace the JSX from:

```jsx
      <div className={`home-copy ${language === "zh" ? "is-zh" : ""}`}>
        <p className="home-eyebrow">{language === "zh" ? "AI 作品集" : "AI portfolio"}</p>
        <h1>Li Li</h1>
        <p className="home-role">Applied AI | AI Product &amp; Evaluation</p>
        <p className="home-summary">
          Portfolio of research, AI data products, and visual computing projects
        </p>
      </div>

      <ArchiveFlowerMap
        sections={sections}
        language={language}
        onOpenSection={onOpenSection}
        activeSectionId={activeSectionId}
      />
```

with:

```jsx
      <div className="home-desktop" aria-label={language === "zh" ? "诗性桌面档案" : "Poetic desktop archive"}>
        <div className="home-window-layer" aria-label={language === "zh" ? "档案窗口入口" : "Archive window entrances"}>
          {homeDesktopWindows.map((windowConfig) => (
            <DesktopWindow
              key={windowConfig.id}
              activeSectionId={activeSectionId}
              language={language}
              onOpenSection={onOpenSection}
              section={sectionById[windowConfig.sectionId]}
              windowConfig={windowConfig}
            />
          ))}
        </div>

        <HomeIdentity language={language} />

        <HomeArchiveEntrances
          activeSectionId={activeSectionId}
          language={language}
          onOpenSection={onOpenSection}
          sections={sections}
        />
      </div>
```

- [ ] **Step 4: Update the canvas aria label**

Replace:

```jsx
aria-label="Interactive pastel paper canvas. Drag to leave soft traces."
```

with:

```jsx
aria-label="Interactive archive paper canvas with soft numeric traces."
```

- [ ] **Step 5: Run tests and build**

Run:

```bash
npm run test:home
npm run build
```

Expected: both PASS. Build output should include generated files under `dist/`.

- [ ] **Step 6: Commit Task 3**

Run:

```bash
git add src/components/HomeCanvas.jsx
git commit -m "feat: compose stable homepage desktop scene"
```

## Task 4: Replace Homepage CSS With Stable Desktop Collage Rules

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace the old homepage identity and flower-map CSS**

In `src/index.css`, replace the block from `.home-canvas-section` through `.home-copy h1 em` with:

```css
.home-canvas-section {
  position: relative;
  min-height: 100svh;
  padding: calc(var(--header-height) + 1.45rem) clamp(1.1rem, 3.8vw, 4rem) 1.45rem;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(255, 253, 248, 0.94), rgba(246, 243, 236, 0.98)),
    #fffdfa;
}

.home-canvas-section::before {
  content: "";
  position: absolute;
  inset: calc(var(--header-height) + 0.75rem) clamp(0.85rem, 2.4vw, 2.6rem) 1rem;
  z-index: 0;
  border: 1px solid rgba(35, 32, 30, 0.13);
  border-radius: clamp(0.9rem, 1.8vw, 1.35rem);
  background:
    repeating-radial-gradient(circle, rgba(35, 32, 30, 0.18) 0 0.7px, transparent 0.85px 4px),
    linear-gradient(118deg, rgba(255, 255, 255, 0.82), rgba(255, 142, 202, 0.12) 46%, rgba(235, 241, 255, 0.2));
  opacity: 0.72;
  pointer-events: none;
}

.home-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0.58;
  touch-action: pan-y;
}

.home-vignette {
  position: absolute;
  inset: clamp(1rem, 2.4vw, 2.3rem);
  z-index: 2;
  border: 1px solid rgba(35, 32, 30, 0.11);
  border-radius: clamp(0.9rem, 1.8vw, 1.35rem);
  pointer-events: none;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.28),
    inset 0 0 52px rgba(38, 32, 28, 0.045);
}

.home-vignette::before {
  content: "";
  position: absolute;
  inset: 1rem;
  border: 1px dashed rgba(35, 32, 30, 0.08);
  border-radius: inherit;
}

.home-desktop {
  position: relative;
  z-index: 7;
  width: min(100%, var(--content-max));
  height: min(760px, calc(100svh - var(--header-height) - 2.9rem));
  min-height: 620px;
  margin: 0 auto;
  isolation: isolate;
}

.home-window-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
}

.home-identity {
  position: absolute;
  top: clamp(2.1rem, 5vh, 4.2rem);
  left: clamp(1rem, 3vw, 3rem);
  z-index: 7;
  display: grid;
  width: min(47rem, 52vw);
  gap: 1rem;
}

.home-identity__eyebrow {
  margin: 0;
  color: rgba(35, 32, 30, 0.62);
  font-family: "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1.35;
  text-transform: uppercase;
}

.home-identity__title {
  display: grid;
  gap: 0.08em;
  max-width: 11ch;
  margin: 0;
  color: rgba(35, 31, 29, 0.94);
  font-family: "Cormorant Garamond", Georgia, "Songti SC", serif;
  font-size: clamp(5.2rem, 8vw, 8.85rem);
  font-style: italic;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 0.9;
  text-wrap: balance;
}

.home-identity__title span {
  display: block;
}

.home-identity__note {
  display: grid;
  max-width: 35rem;
  gap: 0.42rem;
  margin-top: 0.45rem;
  padding: 0.85rem 1rem 0.95rem;
  border: 1px solid rgba(35, 32, 30, 0.12);
  border-left: 0.26rem solid rgba(255, 90, 164, 0.42);
  border-radius: 0.18rem;
  background: rgba(255, 255, 255, 0.68);
  box-shadow: 0 18px 42px rgba(34, 29, 25, 0.08);
}

.home-identity__role,
.home-identity__summary {
  margin: 0;
  letter-spacing: 0;
}

.home-identity__role {
  color: rgba(35, 32, 30, 0.82);
  font-size: clamp(1rem, 1.18vw, 1.18rem);
  font-weight: 800;
  line-height: 1.38;
}

.home-identity__summary {
  color: rgba(35, 32, 30, 0.64);
  font-size: clamp(0.95rem, 1.05vw, 1.06rem);
  font-weight: 560;
  line-height: 1.62;
}

.home-identity--zh {
  width: min(36rem, 48vw);
  gap: 1.05rem;
}

.home-identity--zh .home-identity__title {
  max-width: 8ch;
  font-family: "Songti SC", "STSong", "Noto Serif SC", "Kaiti SC", serif;
  font-size: clamp(3.7rem, 5.5vw, 5.9rem);
  font-style: normal;
  font-weight: 700;
  line-height: 1.14;
}

.home-identity--zh .home-identity__note {
  max-width: 30rem;
  margin-top: 0.25rem;
}

.home-identity--zh .home-identity__role {
  font-size: clamp(1rem, 1.14vw, 1.14rem);
  line-height: 1.55;
}

.home-identity--zh .home-identity__summary {
  font-size: clamp(0.96rem, 1.06vw, 1.08rem);
  line-height: 1.78;
}
```

- [ ] **Step 2: Add desktop window, entrance chip, responsive, and reduced-motion CSS**

Add this CSS immediately after the block from Step 1:

```css
.desktop-window {
  position: absolute;
  z-index: 3;
  display: grid;
  grid-template-rows: 2rem minmax(0, 1fr);
  overflow: hidden;
  padding: 0;
  border: 1px solid rgba(35, 32, 30, 0.22);
  border-radius: 0.62rem 0.62rem 0.34rem 0.34rem;
  background: rgba(252, 251, 248, 0.9);
  box-shadow: 0 18px 42px rgba(32, 28, 25, 0.14);
  cursor: pointer;
  text-align: left;
  transition:
    border-color 240ms ease,
    box-shadow 240ms ease,
    filter 240ms ease,
    transform 240ms ease;
}

.desktop-window__chrome {
  display: flex;
  align-items: center;
  gap: 0.36rem;
  min-width: 0;
  padding: 0 0.72rem;
  border-bottom: 1px solid rgba(35, 32, 30, 0.14);
  background: linear-gradient(#fbfbfb, #e8e8e8);
}

.desktop-window__dot {
  flex: 0 0 auto;
  width: 0.68rem;
  height: 0.68rem;
  border-radius: 999px;
  background: #d4d4d4;
}

.desktop-window__title {
  min-width: 0;
  margin-left: 0.3rem;
  overflow: hidden;
  color: rgba(35, 32, 30, 0.42);
  font-family: "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.desktop-window__surface {
  position: relative;
  display: grid;
  align-content: center;
  gap: 0.78rem;
  min-height: 0;
  padding: 1.2rem;
  isolation: isolate;
}

.desktop-window__surface::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.78;
}

.desktop-window--pink .desktop-window__surface::before {
  background:
    radial-gradient(circle at 46% 38%, rgba(255, 255, 255, 0.68), transparent 18%),
    radial-gradient(circle at 66% 58%, rgba(255, 75, 125, 0.64), transparent 32%),
    repeating-radial-gradient(circle, rgba(34, 24, 30, 0.25) 0 0.85px, transparent 1px 3.1px),
    #ff93ce;
}

.desktop-window--gray .desktop-window__surface::before {
  background:
    linear-gradient(118deg, rgba(255, 255, 255, 0.78), transparent 46%),
    repeating-radial-gradient(circle, rgba(24, 24, 24, 0.3) 0 0.8px, transparent 0.9px 3.6px),
    #d9d9d4;
}

.desktop-window--blue .desktop-window__surface::before {
  background:
    radial-gradient(circle at 45% 38%, rgba(255, 255, 255, 0.72), transparent 18%),
    repeating-linear-gradient(0deg, rgba(44, 118, 210, 0.36) 0 1px, transparent 1px 3px),
    #bdd8ff;
}

.desktop-window--paper .desktop-window__surface::before {
  background:
    repeating-radial-gradient(circle, rgba(35, 32, 30, 0.18) 0 0.65px, transparent 0.8px 3.8px),
    linear-gradient(135deg, #fffdfa, #ece9e3);
}

.desktop-window__headline {
  color: #2e7651;
  font-family: "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: clamp(1.1rem, 1.8vw, 2rem);
  font-weight: 900;
  letter-spacing: 0.04em;
  line-height: 1.06;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.62);
}

.desktop-window__section {
  width: fit-content;
  max-width: 100%;
  border: 1px solid rgba(35, 32, 30, 0.18);
  border-radius: 999px;
  padding: 0.34rem 0.62rem;
  background: rgba(255, 255, 255, 0.7);
  color: rgba(35, 32, 30, 0.66);
  font-size: 0.76rem;
  font-weight: 800;
  line-height: 1.2;
}

.desktop-window:hover,
.desktop-window:focus-visible,
.desktop-window.is-active {
  border-color: rgba(255, 90, 164, 0.42);
  box-shadow: 0 22px 52px rgba(32, 28, 25, 0.18);
  filter: saturate(1.08) contrast(1.02);
  transform: translateY(-0.22rem);
}

.desktop-window:focus-visible,
.home-archive-chip:focus-visible {
  outline: 2px solid rgba(46, 118, 81, 0.62);
  outline-offset: 4px;
}

.desktop-window--ai-products {
  top: 4.2rem;
  right: 22%;
  width: min(26rem, 32vw);
  height: 10.6rem;
  transform: rotate(-1.5deg);
}

.desktop-window--ai-products:hover,
.desktop-window--ai-products:focus-visible,
.desktop-window--ai-products.is-active {
  transform: translateY(-0.22rem) rotate(-1.5deg);
}

.desktop-window--research {
  top: 11.8rem;
  right: 3.2rem;
  width: min(31rem, 36vw);
  height: 15rem;
  transform: rotate(1.5deg);
}

.desktop-window--research:hover,
.desktop-window--research:focus-visible,
.desktop-window--research.is-active {
  transform: translateY(-0.22rem) rotate(1.5deg);
}

.desktop-window--data-work {
  right: 15%;
  bottom: 7.3rem;
  width: min(23rem, 28vw);
  height: 10.2rem;
  transform: rotate(-2deg);
}

.desktop-window--data-work:hover,
.desktop-window--data-work:focus-visible,
.desktop-window--data-work.is-active {
  transform: translateY(-0.22rem) rotate(-2deg);
}

.desktop-window--about {
  left: 3rem;
  bottom: 8rem;
  width: min(24rem, 30vw);
  height: 9.3rem;
  transform: rotate(1.2deg);
}

.desktop-window--about:hover,
.desktop-window--about:focus-visible,
.desktop-window--about.is-active {
  transform: translateY(-0.22rem) rotate(1.2deg);
}

.desktop-window--cv {
  right: 2rem;
  bottom: 4.7rem;
  width: min(16rem, 20vw);
  height: 8.2rem;
  transform: rotate(2deg);
}

.desktop-window--cv:hover,
.desktop-window--cv:focus-visible,
.desktop-window--cv.is-active {
  transform: translateY(-0.22rem) rotate(2deg);
}

.home-archive-entrances {
  position: absolute;
  right: clamp(1rem, 2.8vw, 2.6rem);
  bottom: 0;
  left: clamp(1rem, 2.8vw, 2.6rem);
  z-index: 9;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.65rem;
}

.home-archive-chip {
  display: grid;
  min-width: 0;
  min-height: 4.8rem;
  gap: 0.24rem;
  align-content: center;
  padding: 0.78rem 0.82rem;
  border: 1px solid rgba(35, 32, 30, 0.16);
  border-radius: 0.48rem;
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 12px 26px rgba(32, 28, 25, 0.08);
  color: rgba(35, 32, 30, 0.72);
  cursor: pointer;
  text-align: left;
  transition:
    background 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.home-archive-chip span {
  color: rgba(255, 90, 164, 0.72);
  font-family: "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 0.72rem;
  font-weight: 900;
  line-height: 1;
}

.home-archive-chip strong {
  overflow-wrap: anywhere;
  font-size: clamp(0.9rem, 1vw, 1.04rem);
  font-weight: 850;
  letter-spacing: 0;
  line-height: 1.16;
}

.home-archive-chip small {
  overflow-wrap: anywhere;
  color: rgba(35, 32, 30, 0.52);
  font-size: 0.72rem;
  font-weight: 650;
  line-height: 1.22;
}

.home-archive-chip:hover,
.home-archive-chip:focus-visible,
.home-archive-chip.is-active {
  border-color: rgba(46, 118, 81, 0.34);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 16px 34px rgba(32, 28, 25, 0.12);
  transform: translateY(-0.16rem);
}

.home-canvas-section.is-zh .home-archive-chip {
  min-height: 5.2rem;
}

.home-canvas-section.is-zh .home-archive-chip strong {
  font-size: clamp(0.94rem, 1.05vw, 1.08rem);
  line-height: 1.28;
}

.home-canvas-section.is-zh .home-archive-chip small {
  font-size: 0.75rem;
  line-height: 1.36;
}

@media (max-width: 1180px) {
  .home-desktop {
    height: auto;
    min-height: calc(100svh - var(--header-height) - 2.9rem);
    display: grid;
    gap: 1rem;
    align-content: start;
  }

  .home-window-layer,
  .home-identity,
  .home-archive-entrances {
    position: relative;
    inset: auto;
  }

  .home-identity,
  .home-identity--zh {
    width: min(100%, 43rem);
    padding: clamp(1.5rem, 4vw, 2.4rem) clamp(0.4rem, 1vw, 0.8rem) 0;
  }

  .home-identity__title {
    font-size: clamp(4.3rem, 10vw, 7rem);
  }

  .home-identity--zh .home-identity__title {
    font-size: clamp(3rem, 7.2vw, 4.8rem);
  }

  .home-window-layer {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem;
    order: 2;
  }

  .desktop-window,
  .desktop-window:hover,
  .desktop-window:focus-visible,
  .desktop-window.is-active,
  .desktop-window--ai-products,
  .desktop-window--research,
  .desktop-window--data-work,
  .desktop-window--about,
  .desktop-window--cv {
    position: relative;
    inset: auto;
    width: auto;
    height: 9.8rem;
    transform: none;
  }

  .desktop-window:hover,
  .desktop-window:focus-visible,
  .desktop-window.is-active {
    transform: translateY(-0.16rem);
  }

  .home-archive-entrances {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    order: 3;
    padding-bottom: 1rem;
  }
}

@media (max-width: 680px) {
  .home-canvas-section {
    padding: calc(var(--header-height) + 0.8rem) 0.95rem 1rem;
  }

  .home-canvas-section::before {
    inset: calc(var(--header-height) + 0.48rem) 0.55rem 0.55rem;
  }

  .home-vignette {
    inset: 0.72rem;
  }

  .home-desktop {
    gap: 0.82rem;
    min-height: auto;
  }

  .home-identity,
  .home-identity--zh {
    padding-top: 1.1rem;
  }

  .home-identity__title {
    max-width: 8.5ch;
    font-size: clamp(3.4rem, 18vw, 5.1rem);
    line-height: 0.96;
  }

  .home-identity--zh .home-identity__title {
    max-width: 7ch;
    font-size: clamp(2.6rem, 12vw, 3.7rem);
    line-height: 1.18;
  }

  .home-identity__note {
    max-width: 100%;
    padding: 0.78rem 0.86rem;
  }

  .home-window-layer,
  .home-archive-entrances {
    grid-template-columns: 1fr;
  }

  .desktop-window,
  .desktop-window--ai-products,
  .desktop-window--research,
  .desktop-window--data-work,
  .desktop-window--about,
  .desktop-window--cv {
    min-height: 8.6rem;
    height: auto;
  }

  .home-archive-chip {
    min-height: 4.4rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .desktop-window,
  .home-archive-chip {
    transition: none;
  }

  .desktop-window:hover,
  .desktop-window:focus-visible,
  .desktop-window.is-active,
  .home-archive-chip:hover,
  .home-archive-chip:focus-visible,
  .home-archive-chip.is-active {
    transform: none;
  }
}
```

- [ ] **Step 3: Remove obsolete flower-map first-viewport CSS selectors**

Delete homepage-only selectors that are no longer used by `HomeCanvas`:

```text
.archive-flower-map
.archive-garden-svg
.garden-root-lines
.garden-stem
.garden-stem-highlight
.garden-pot
.garden-soil
.garden-pot-rim
.garden-pot-rim-back
.garden-pot-body
.garden-pot-base
.archive-branch
.flower-head-mark
.water-lily-petal
.petal-outer
.petal-mid
.petal-inner
.tone-rose
.tone-mauve
.tone-cream
.tone-mid-rose
.tone-mid-cream
.tone-mid-mauve
.tone-inner-cream
.tone-inner-rose
.tone-inner-yellow
.flower-center
.flower-core-line
.flower-label
.flower-alt-label
.flower-index-badge
```

Keep `ArchiveFlowerMap.jsx` in the repository for now; only remove its first-viewport CSS if no other component imports it.

- [ ] **Step 4: Run tests and build**

Run:

```bash
npm run test:home
npm run build
```

Expected: both PASS.

- [ ] **Step 5: Commit Task 4**

Run:

```bash
git add src/index.css
git commit -m "style: redesign homepage desktop collage"
```

## Task 5: Visual And Interaction Verification

**Files:**
- Modify if needed: `src/index.css`
- Modify if needed: `src/components/HomeIdentity.jsx`
- Modify if needed: `src/components/HomeArchiveEntrances.jsx`
- Modify if needed: `src/components/DesktopWindow.jsx`

- [ ] **Step 1: Start the Vite dev server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite prints a local URL such as `http://127.0.0.1:5173/archive-of-li-li/` or `http://127.0.0.1:5173/`.

- [ ] **Step 2: Verify desktop English layout**

Open the local URL in the browser at a desktop viewport around `1440x900`.

Checks:

- The title appears as two separate lines: `The Archive` and `of Li Li`.
- The role and summary appear in the note block below the title, not on top of the title.
- Browser-like windows sit behind/around the identity without covering title text.
- Five archive chips appear in the bottom band and all labels fit.
- Hover/focus lifts windows/chips without shifting the whole layout.

- [ ] **Step 3: Verify desktop Chinese layout**

Click the language switch to Chinese at the same desktop viewport.

Checks:

- The title appears as two separate lines: `李莉的` and `数字档案馆`.
- The Chinese title uses a smaller, non-italic serif treatment.
- The role and summary stay below the title in the note block.
- No Chinese chip label overlaps or escapes its chip.

- [ ] **Step 4: Verify mobile English and Chinese layouts**

Test at `390x844`.

Checks:

- The page becomes a vertical stack: identity, windows, chips.
- No absolute-positioned window covers the title or note.
- English and Chinese titles both fit without clipping.
- Chips are single-column and readable.

- [ ] **Step 5: Verify section opening**

For each section, click both its window and its chip:

```text
AI Products
Research
Data Work
About
CV
```

Expected: the existing overlay opens to the matching section. Close the overlay between checks.

- [ ] **Step 6: Fix any visual issues found**

If overlap appears, adjust only these CSS values:

```css
.home-identity {
  width: min(47rem, 52vw);
}

.home-identity__title {
  font-size: clamp(5.2rem, 8vw, 8.85rem);
  line-height: 0.9;
}

.home-identity--zh .home-identity__title {
  font-size: clamp(3.7rem, 5.5vw, 5.9rem);
  line-height: 1.14;
}

.desktop-window--research {
  top: 11.8rem;
  right: 3.2rem;
}
```

Expected: only spacing, position, font-size, or line-height changes are needed. Do not add drag, random layout, or new dependencies.

- [ ] **Step 7: Run final tests and build**

Run:

```bash
npm run test:home
npm run build
```

Expected: both PASS.

- [ ] **Step 8: Commit Task 5**

Run:

```bash
git add src/index.css src/components/HomeIdentity.jsx src/components/HomeArchiveEntrances.jsx src/components/DesktopWindow.jsx
git commit -m "fix: verify bilingual homepage layout"
```

## Task 6: Final Cleanup And Delivery

**Files:**
- Modify if needed: `README.md`
- Inspect: `git status`

- [ ] **Step 1: Check whether README needs a note**

Run:

```bash
rg -n "homepage|首页|visual|design|archive" README.md
```

Expected: If README already only covers running/publishing, leave it unchanged. If a homepage editing note exists, update it to mention the new files `homeDesktopConfig.js`, `DesktopWindow.jsx`, `HomeIdentity.jsx`, and `HomeArchiveEntrances.jsx`.

- [ ] **Step 2: Confirm no temporary files are staged**

Run:

```bash
git status --short
```

Expected: no `.superpowers/` files appear because `.gitignore` ignores them.

- [ ] **Step 3: Run final verification commands**

Run:

```bash
npm run test:home
npm run build
```

Expected: both PASS.

- [ ] **Step 4: Review recent commits**

Run:

```bash
git log --oneline -5
```

Expected: includes commits for config tests, components, composition, styling, and visual fixes.

- [ ] **Step 5: Deliver summary**

Report:

```text
Implemented the stable poetic desktop homepage.
Verified: npm run test:home, npm run build, desktop EN/ZH, mobile EN/ZH, section window/chip opening.
```

If any visual verification could not be performed, report exactly which viewport or language state remains unchecked.

## Self-Review

- Spec coverage: Tasks cover stable desktop collage, bilingual typography, no drag/random windows, existing overlay behavior, keyboard-accessible section entrances, responsive/mobile behavior, reduced motion, tests, build, and visual verification.
- Marker scan: The plan contains no unresolved planning markers and no unspecified edge handling.
- Type consistency: Config names match component imports: `homeDesktopWindows`, `getHomeIdentityCopy`, `getHomeSectionEntries`, `DesktopWindow`, `HomeIdentity`, and `HomeArchiveEntrances`.
