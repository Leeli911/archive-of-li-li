function SectionIntro({
  index,
  eyebrow,
  eyebrowZh,
  title,
  titleZh,
  description,
  descriptionZh,
  language = "en",
}) {
  const isZh = language === "zh";
  const eyebrowText = isZh
    ? eyebrowZh || eyebrow.split("/").at(-1).trim()
    : eyebrow.split("/")[0].trim();

  return (
    <div className="section-intro">
      <div className="section-index" aria-hidden="true">
        {index}
      </div>
      <div className="section-heading">
        <p>{eyebrowText}</p>
        <h2>{isZh ? titleZh : title}</h2>
        <span>{isZh ? title : titleZh}</span>
      </div>
      <div className="section-description">
        <p>{isZh ? descriptionZh : description}</p>
      </div>
    </div>
  );
}

export default SectionIntro;
