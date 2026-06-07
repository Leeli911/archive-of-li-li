import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import HomeCanvas from "./components/HomeCanvas";
import ArchiveOverlay from "./components/ArchiveOverlay";
import BloomTransition from "./components/BloomTransition";
import LilyCursor from "./components/LilyCursor";
import Footer from "./components/Footer";
import { aiProducts } from "./data/aiProducts";
import { researchProjects } from "./data/researchProjects";
import { professionalCases, professionalOverview } from "./data/professionalCases";
import { publicAsset } from "./utils/assets";

const archiveSections = [
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
    id: "life-notes",
    label: "Life Notes",
    labelZh: "生活札记",
    detail: "Places and observations",
    detailZh: "城市与观察",
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

const normalizeHashPart = (value = "") =>
  decodeURIComponent(value).trim().toLowerCase();

function getHashTarget() {
  const rawHash = window.location.hash.replace(/^#/, "");
  if (!rawHash) return null;

  const [sectionSlug, targetSlug] = rawHash.split("/");
  const sectionId = normalizeHashPart(sectionSlug);
  const section = archiveSections.find((item) => item.id === sectionId);

  if (!section) return null;

  return {
    section,
    targetId: normalizeHashPart(targetSlug || ""),
  };
}

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [bloom, setBloom] = useState(null);
  const [language, setLanguage] = useState("en");
  const [targetId, setTargetId] = useState("");
  const [highlightedTargetId, setHighlightedTargetId] = useState("");
  const activeSectionRef = useRef(activeSection);
  const overlayOpenRef = useRef(isOverlayOpen);
  const highlightTimeoutRef = useRef(null);

  useEffect(() => {
    activeSectionRef.current = activeSection;
    overlayOpenRef.current = isOverlayOpen;
  }, [activeSection, isOverlayOpen]);

  const clearArchiveHash = () => {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
  };

  const closeOverlay = () => {
    clearArchiveHash();
    setTargetId("");
    setHighlightedTargetId("");
    setIsOverlayOpen(false);
    setIsSwitching(false);
    window.setTimeout(() => setActiveSection(null), 360);
  };

  const openSection = (section, position = {}) => {
    clearArchiveHash();
    setTargetId("");
    setHighlightedTargetId("");

    if (isOverlayOpen && activeSection?.id === section.id) {
      closeOverlay();
      return;
    }

    const bloomPosition = {
      x: position.x || window.innerWidth / 2,
      y: position.y || window.innerHeight / 2,
    };

    setIsSwitching(isOverlayOpen);
    setBloom({
      ...bloomPosition,
      label: language === "zh" ? section.labelZh : section.label,
      detail: language === "zh" ? section.detailZh : section.detail,
      seed: archiveSections.findIndex((item) => item.id === section.id),
    });
    setActiveSection(section);
    setIsOverlayOpen(true);
    window.setTimeout(() => setIsSwitching(false), 260);
    window.setTimeout(() => setBloom(null), 1050);
  };

  useEffect(() => {
    const showHashTarget = () => {
      const next = getHashTarget();

      if (!next) {
        if (!window.location.hash && overlayOpenRef.current) {
          setTargetId("");
          setHighlightedTargetId("");
          setIsOverlayOpen(false);
          setIsSwitching(false);
          window.setTimeout(() => setActiveSection(null), 360);
        }
        return;
      }

      const isChangingSection =
        overlayOpenRef.current && activeSectionRef.current?.id !== next.section.id;

      setBloom(null);
      setIsSwitching(isChangingSection);
      setActiveSection(next.section);
      setTargetId(next.targetId);
      setIsOverlayOpen(true);

      if (highlightTimeoutRef.current) {
        window.clearTimeout(highlightTimeoutRef.current);
      }

      setHighlightedTargetId(next.targetId);
      if (next.targetId) {
        highlightTimeoutRef.current = window.setTimeout(() => {
          setHighlightedTargetId((current) =>
            current === next.targetId ? "" : current,
          );
        }, 2600);
      }

      window.setTimeout(() => setIsSwitching(false), 260);
    };

    showHashTarget();
    window.addEventListener("hashchange", showHashTarget);

    return () => {
      window.removeEventListener("hashchange", showHashTarget);
      if (highlightTimeoutRef.current) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOverlayOpen || !targetId) return undefined;

    const scrollTimer = window.setTimeout(() => {
      const target = document.querySelector(
        `[data-archive-anchor="${targetId}"]`,
      );

      if (target) {
        target.scrollIntoView({ block: "start", behavior: "smooth" });
        target.focus({ preventScroll: true });
      }
    }, 520);

    return () => window.clearTimeout(scrollTimer);
  }, [activeSection?.id, isOverlayOpen, targetId]);

  return (
    <div
      className={`site-shell ${isOverlayOpen ? "has-overlay" : ""}`}
      style={{
        "--home-archive-bg": `url("${publicAsset("/images/drawings/li-li-lily-river-archive.svg")}")`,
      }}
    >
      <Header
        sections={archiveSections}
        activeSectionId={isOverlayOpen ? activeSection?.id : null}
        onSelectSection={openSection}
        onCloseOverlay={closeOverlay}
        language={language}
        onLanguageChange={setLanguage}
      />
      <main>
        <HomeCanvas
          sections={archiveSections}
          onOpenSection={openSection}
          language={language}
        />
      </main>
      <ArchiveOverlay
        section={activeSection}
        aiProducts={aiProducts}
        researchProjects={researchProjects}
        professionalCases={professionalCases}
        professionalOverview={professionalOverview}
        onClose={closeOverlay}
        isOpen={isOverlayOpen}
        isSwitching={isSwitching}
        language={language}
        targetId={targetId}
        highlightedTargetId={highlightedTargetId}
      />
      <BloomTransition bloom={bloom} />
      <LilyCursor waiting={Boolean(bloom) || isSwitching} />
      <Footer />
    </div>
  );
}

export default App;
