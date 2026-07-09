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
      data-section-id={section.id}
      onClick={handleOpen}
    >
      <span className="desktop-window__chrome" aria-hidden="true">
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
