import { publicAsset } from "../utils/assets";

function LifeArchiveCard({ fragment, language = "en" }) {
  const isZh = language === "zh";
  const note = isZh ? fragment.noteZh || fragment.note : fragment.note;

  return (
    <article className="life-card">
      <div className="life-photo">
        <img
          src={publicAsset(fragment.image)}
          alt={fragment.imageAlt}
          loading="lazy"
          decoding="async"
        />
        <div className="life-metadata">
          <span>{isZh ? fragment.locationZh || fragment.location : fragment.location}</span>
          <small>{isZh ? fragment.dateZh || fragment.date : fragment.date}</small>
          <p>{note}</p>
        </div>
      </div>
      <div className="life-caption">
        <span>{fragment.id}</span>
        <p>{note}</p>
      </div>
    </article>
  );
}

export default LifeArchiveCard;
