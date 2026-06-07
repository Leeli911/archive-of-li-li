import { useEffect, useState } from "react";
import { publicAsset } from "../utils/assets";

function ResearchProjectCard({
  project,
  language = "en",
  targetId,
  highlightedTargetId,
}) {
  const [open, setOpen] = useState(false);
  const isZh = language === "zh";
  const anchorId = project.id.toLowerCase();
  const isTargeted = targetId === anchorId;
  const isHighlighted = highlightedTargetId === anchorId;
  const tags = isZh ? project.tagsZh || project.tags : project.tags;
  const learned = isZh ? project.learnedZh || project.learned : project.learned;
  const status = isZh ? project.statusZh || project.status : project.status;
  const imageSrc = publicAsset(isZh ? project.imageZh || project.image : project.image);
  const imageAlt = isZh
    ? project.imageAltZh || project.imageAlt
    : project.imageAlt;
  const links = project.links?.filter((link) => link.href && link.href !== "#") || [];
  const visuals = project.keyVisuals || [];
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
      <button
        className="research-card-summary"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <div className="research-figure">
          <img src={imageSrc} alt={imageAlt} />
          <span>{project.id}</span>
        </div>
        <div className="research-summary-copy">
          <p className="research-label">{isZh ? project.labelZh || project.label : project.label}</p>
          <h3>{isZh ? project.titleZh : project.title}</h3>
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
        </div>
        <span className="drawer-handle">
          <i aria-hidden="true" />
          {open
            ? isZh ? "关闭抽屉" : "Close drawer"
            : isZh ? "打开抽屉" : "Open drawer"}
        </span>
      </button>

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
                  <figure key={visual.src}>
                    <img src={publicAsset(visual.src)} alt={visual.alt} loading="lazy" />
                    <figcaption>{isZh ? visual.captionZh || visual.caption : visual.caption}</figcaption>
                  </figure>
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

export default ResearchProjectCard;
