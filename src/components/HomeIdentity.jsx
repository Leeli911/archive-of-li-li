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
