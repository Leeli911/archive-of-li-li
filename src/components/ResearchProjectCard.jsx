import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { publicAsset } from "../utils/assets";

const emptyLinks = [];
const emptyVisuals = [];

const ResearchVisualFigure = memo(function ResearchVisualFigure({
  visual,
  isZh,
  projectTitle,
  onImagePreview,
}) {
  const visualSrc = useMemo(() => publicAsset(visual.src), [visual.src]);
  const caption = isZh ? visual.captionZh || visual.caption : visual.caption;
  const title = caption || projectTitle;

  const openImagePreview = useCallback(() => {
    onImagePreview?.({
      src: visualSrc,
      alt: visual.alt || title,
      title,
      caption,
    });
  }, [caption, onImagePreview, title, visual.alt, visualSrc]);

  return (
    <figure>
      <button
        className="image-preview-trigger key-visual-preview-button"
        type="button"
        aria-label={`${isZh ? "打开图片预览" : "Open image preview"}: ${title}`}
        onClick={openImagePreview}
      >
        <img
          src={visualSrc}
          alt={visual.alt}
          loading="lazy"
          decoding="async"
        />
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  );
});

function ResearchProjectCard({
  project,
  language = "en",
  targetId,
  highlightedTargetId,
  onImagePreview,
}) {
  const [open, setOpen] = useState(false);
  const isZh = language === "zh";
  const anchorId = project.id.toLowerCase();
  const isTargeted = targetId === anchorId;
  const isHighlighted = highlightedTargetId === anchorId;
  const title = isZh ? project.titleZh : project.title;
  const tags = isZh ? project.tagsZh || project.tags : project.tags;
  const learned = isZh ? project.learnedZh || project.learned : project.learned;
  const status = isZh ? project.statusZh || project.status : project.status;
  const imageSrc = useMemo(
    () => publicAsset(isZh ? project.imageZh || project.image : project.image),
    [isZh, project],
  );
  const imageAlt = isZh
    ? project.imageAltZh || project.imageAlt
    : project.imageAlt;
  const openMainImagePreview = useCallback(() => {
    onImagePreview?.({
      src: imageSrc,
      alt: imageAlt || title,
      title,
      caption: imageAlt,
    });
  }, [imageAlt, imageSrc, onImagePreview, title]);
  const toggleOpen = useCallback(() => {
    setOpen((current) => !current);
  }, []);
  const links = useMemo(
    () => project.links?.filter((link) => link.href && link.href !== "#") || emptyLinks,
    [project.links],
  );
  const visuals = project.keyVisuals || emptyVisuals;
  const teachingPath = isZh
    ? project.teachingPathZh || project.teachingPath
    : project.teachingPath;

  useEffect(() => {
    if (isTargeted) {
      setOpen(true);
    }
  }, [isTargeted]);

  return (
    <article
      id={anchorId}
      data-archive-anchor={anchorId}
      className={`research-card ${open ? "is-open" : ""} ${isHighlighted ? "is-highlighted" : ""}`}
      tabIndex="-1"
    >
      <div className="research-card-summary">
        <button
          className="image-preview-trigger research-figure-button"
          type="button"
          aria-label={`${isZh ? "打开图片预览" : "Open image preview"}: ${title}`}
          onClick={openMainImagePreview}
        >
          <div className="research-figure">
            <img src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" />
            <span>{project.id}</span>
          </div>
        </button>
        <button
          className="research-summary-copy research-summary-toggle"
          type="button"
          aria-expanded={open}
          onClick={toggleOpen}
        >
          <p className="research-label">{isZh ? project.labelZh || project.label : project.label}</p>
          <h3>{title}</h3>
          <p className="card-title-zh">{isZh ? project.title : project.titleZh}</p>
          {status && <p className="research-status">{status}</p>}
          <p className="research-question-preview">
            {isZh ? project.questionZh || project.question : project.question}
          </p>
          {tags?.length > 0 && (
            <div className="research-tags" aria-label={isZh ? "研究方法标签" : "Research method tags"}>
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </button>
        <button
          className="drawer-handle"
          type="button"
          aria-expanded={open}
          onClick={toggleOpen}
        >
          <i aria-hidden="true" />
          {open
            ? isZh ? "关闭抽屉" : "Close drawer"
            : isZh ? "打开抽屉" : "Open drawer"}
        </button>
      </div>

      <div className="research-drawer">
        <div className="drawer-inner">
          <dl className="drawer-grid">
            <div>
              <dt>{isZh ? "研究问题" : "Research Question"}</dt>
              <dd>{isZh ? project.questionZh || project.question : project.question}</dd>
            </div>
            <div>
              <dt>{isZh ? "方法" : "Method"}</dt>
              <dd>{isZh ? project.methodZh || project.method : project.method}</dd>
            </div>
            <div>
              <dt>{isZh ? "数据集 / 材料" : "Dataset / Material"}</dt>
              <dd>{isZh ? project.materialZh || project.material : project.material}</dd>
            </div>
            <div>
              <dt>{isZh ? "结果" : "Result"}</dt>
              <dd>{isZh ? project.resultZh || project.result : project.result}</dd>
            </div>
            <div className="drawer-reflection">
              <dt>{isZh ? "反思" : "Reflection"}</dt>
              <dd>{isZh ? project.reflectionZh || project.reflection : project.reflection}</dd>
            </div>
            {learned && (
              <div className="drawer-learned">
                <dt>{isZh ? "能力沉淀" : "Capability Built"}</dt>
                <dd>{learned}</dd>
              </div>
            )}
          </dl>
          {teachingPath?.length > 0 && (
            <section className="research-teaching-path" aria-label={isZh ? "问题展开" : "Problem walkthrough"}>
              <p className="key-visuals-title">{isZh ? "问题展开" : "Problem Walkthrough"}</p>
              <div className="teaching-path-grid">
                {teachingPath.map((step, index) => (
                  <article key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
          {visuals.length > 0 && (
            <section className="research-key-visuals" aria-label={isZh ? "关键图表" : "Key visuals"}>
              <p className="key-visuals-title">{isZh ? "关键图表" : "Key Visuals"}</p>
              <div className="key-visuals-grid">
                {visuals.map((visual) => (
                  <ResearchVisualFigure
                    key={visual.src}
                    visual={visual}
                    isZh={isZh}
                    projectTitle={title}
                    onImagePreview={onImagePreview}
                  />
                ))}
              </div>
            </section>
          )}
          {links.length > 0 && (
            <div className="card-links drawer-links">
              {links.map((link) => (
                <a key={link.label} href={link.href}>
                  {isZh ? link.labelZh || link.label : link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default memo(ResearchProjectCard);
