import { useState } from "react";
import Header from "./components/Header";
import HomeCanvas from "./components/HomeCanvas";
import ArchiveOverlay from "./components/ArchiveOverlay";
import BloomTransition from "./components/BloomTransition";
import LilyCursor from "./components/LilyCursor";
import Footer from "./components/Footer";
import { aiProducts } from "./data/aiProducts";
import { researchProjects } from "./data/researchProjects";
import { professionalCases } from "./data/professionalCases";
import { lifeArchive } from "./data/lifeArchive";

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

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [bloom, setBloom] = useState(null);
  const [language, setLanguage] = useState("en");

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setIsSwitching(false);
    window.setTimeout(() => setActiveSection(null), 360);
  };

  const openSection = (section, position = {}) => {
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

  return (
    <div className={`site-shell ${isOverlayOpen ? "has-overlay" : ""}`}>
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
        lifeArchive={lifeArchive}
        onClose={closeOverlay}
        isOpen={isOverlayOpen}
        isSwitching={isSwitching}
        language={language}
      />
      <BloomTransition bloom={bloom} />
      <LilyCursor />
      <Footer />
    </div>
  );
}

export default App;
