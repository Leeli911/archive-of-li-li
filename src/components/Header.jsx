import { useState } from "react";

function Header({
  sections,
  activeSectionId,
  onSelectSection,
  onCloseOverlay,
  language,
  onLanguageChange,
}) {
  const [open, setOpen] = useState(false);

  const handleHome = () => {
    setOpen(false);
    onCloseOverlay();
  };

  const handleSelect = (event, section) => {
    setOpen(false);
    onSelectSection(section, {
      x: event.clientX || window.innerWidth / 2,
      y: event.clientY || 44,
    });
  };

  return (
    <header className="site-header">
      <button className="site-mark" type="button" onClick={handleHome}>
        <span>The Archive of Li Li</span>
        <small>李莉的数字档案馆</small>
      </button>

      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{open ? (language === "zh" ? "关闭" : "Close") : "Menu"}</span>
        <i aria-hidden="true" />
      </button>

      <div className={`header-actions ${open ? "is-open" : ""}`}>
        <nav
          id="site-navigation"
          className={`site-navigation ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <button
            className={!activeSectionId ? "is-active" : ""}
            type="button"
            onClick={handleHome}
          >
            {language === "zh" ? "首页" : "Home"}
          </button>
          {sections.map((section) => (
            <button
              key={section.id}
              className={activeSectionId === section.id ? "is-active" : ""}
              type="button"
              onClick={(event) => handleSelect(event, section)}
            >
              {language === "zh" ? section.labelZh : section.label}
            </button>
          ))}
        </nav>

        <div className="language-toggle" aria-label="Language switch">
          <button
            className={language === "en" ? "is-active" : ""}
            type="button"
            onClick={() => onLanguageChange("en")}
          >
            EN
          </button>
          <button
            className={language === "zh" ? "is-active" : ""}
            type="button"
            onClick={() => onLanguageChange("zh")}
          >
            中文
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
