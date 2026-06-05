import { useState } from "react";

function ResearchProjectCard({ project, language = "en" }) {
  const [open, setOpen] = useState(false);
  const isZh = language === "zh";

  return (
    <article className={`research-card ${open ? "is-open" : ""}`}>
      <button
        className="research-card-summary"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <div className="research-figure">
          <img src={project.image} alt={project.imageAlt} />
          <span>{project.id}</span>
        </div>
        <div className="research-summary-copy">
          <p className="research-label">{isZh ? project.labelZh || project.label : project.label}</p>
          <h3>{isZh ? project.titleZh : project.title}</h3>
          <p className="card-title-zh">{isZh ? project.title : project.titleZh}</p>
          <p className="research-question-preview">
            {isZh ? project.questionZh || project.question : project.question}
          </p>
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
          </dl>
          <div className="card-links drawer-links">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => event.preventDefault()}
              >
                {isZh ? link.labelZh || link.label : link.label} · {isZh ? "占位链接" : "placeholder"} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ResearchProjectCard;
