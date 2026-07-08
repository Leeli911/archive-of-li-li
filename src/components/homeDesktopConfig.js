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
