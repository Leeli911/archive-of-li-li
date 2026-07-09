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
            data-section-id={entry.id}
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
