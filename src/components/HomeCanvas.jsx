import DesktopWindow from "./DesktopWindow";
import HomeArchiveEntrances from "./HomeArchiveEntrances";
import HomeIdentity from "./HomeIdentity";
import { homeDesktopWindows } from "./homeDesktopConfig";

function HomeCanvas({ sections, onOpenSection, language, activeSectionId }) {
  const sectionById = sections.reduce((lookup, section) => {
    lookup[section.id] = section;
    return lookup;
  }, {});

  return (
    <section
      id="home"
      className={`home-canvas-section ${language === "zh" ? "is-zh" : ""}`}
    >
      <div className="home-vignette" aria-hidden="true" />

      <div
        className="home-desktop"
        aria-label={language === "zh" ? "诗性桌面档案" : "Poetic desktop archive"}
      >
        <div
          className="home-window-layer"
          aria-label={language === "zh" ? "档案窗口入口" : "Archive window entrances"}
        >
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
    </section>
  );
}

export default HomeCanvas;
