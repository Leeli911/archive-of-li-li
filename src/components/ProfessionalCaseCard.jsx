import { memo, useCallback, useMemo } from "react";
import { publicAsset } from "../utils/assets";

function ProfessionalCaseCard({
  professionalCase,
  language = "en",
  isHighlighted = false,
  onImagePreview,
}) {
  const isZh = language === "zh";
  const anchorId = professionalCase.id.toLowerCase();
  const title = isZh ? professionalCase.titleZh : professionalCase.title;
  const sections = useMemo(
    () => [
      {
        label: isZh ? "问题" : "Problem",
        value: isZh ? professionalCase.problemZh || professionalCase.problem : professionalCase.problem,
      },
      {
        label: isZh ? "行动" : "Action",
        value: isZh ? professionalCase.actionZh || professionalCase.action : professionalCase.action,
      },
      {
        label: isZh ? "结果" : "Result",
        value: isZh ? professionalCase.resultZh || professionalCase.result : professionalCase.result,
      },
    ],
    [isZh, professionalCase],
  );
  const skills = useMemo(
    () => (isZh
      ? professionalCase.skillsZh || professionalCase.skills
      : professionalCase.skills),
    [isZh, professionalCase],
  );
  const imageSrc = useMemo(
    () => publicAsset(
      isZh
        ? professionalCase.imageZh || professionalCase.image
        : professionalCase.image,
    ),
    [isZh, professionalCase],
  );
  const imageAlt = isZh
    ? professionalCase.imageAltZh || professionalCase.imageAlt
    : professionalCase.imageAlt;
  const openImagePreview = useCallback(() => {
    onImagePreview?.({
      src: imageSrc,
      alt: imageAlt || title,
      title,
      caption: imageAlt,
    });
  }, [imageAlt, imageSrc, onImagePreview, title]);
  const framework = professionalCase.framework || [];
  const examples = useMemo(
    () => (isZh
      ? professionalCase.examplesZh || professionalCase.examples || []
      : professionalCase.examples || []),
    [isZh, professionalCase],
  );

  return (
    <article
      id={anchorId}
      data-archive-anchor={anchorId}
      className={`professional-card ${isHighlighted ? "is-highlighted" : ""}`}
      tabIndex="-1"
    >
      <div className="professional-card-head">
        <div>
          <span>{professionalCase.id}</span>
          <h3>{title}</h3>
          <p>{isZh ? professionalCase.title : professionalCase.titleZh}</p>
          {professionalCase.category && (
            <small>
              {isZh
                ? professionalCase.categoryZh || professionalCase.category
                : professionalCase.category}
            </small>
          )}
        </div>
        <button
          className="image-preview-trigger professional-image-button"
          type="button"
          aria-label={`${isZh ? "打开图片预览" : "Open image preview"}: ${title}`}
          onClick={openImagePreview}
        >
          <img src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" />
        </button>
      </div>

      <div className="par-structure">
        {sections.map((section) => (
          <section key={section.label}>
            <h4>{section.label}</h4>
            <p>{section.value}</p>
          </section>
        ))}
      </div>

      {framework.length > 0 && (
        <div className="case-framework">
          <span>{isZh ? "案例逻辑" : "Case logic"}</span>
          <div>
            {framework.map((item) => (
              <article key={item.label}>
                <strong>{isZh ? item.labelZh : item.label}</strong>
                <p>{isZh ? item.textZh : item.text}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {examples.length > 0 && (
        <div className="case-examples">
          <span>{isZh ? "具体例子" : "Concrete examples"}</span>
          <p>{examples.join(" · ")}</p>
        </div>
      )}

      <div className="skills-row">
        <span>{isZh ? "能力体现" : "Skills demonstrated"}</span>
        <p>{skills.join(" · ")}</p>
      </div>
    </article>
  );
}

export default memo(ProfessionalCaseCard);
