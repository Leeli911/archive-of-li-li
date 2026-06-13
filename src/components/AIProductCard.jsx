import { publicAsset } from "../utils/assets";

const accentClasses = {
  terracotta: "accent-terracotta",
  moss: "accent-moss",
  powder: "accent-powder",
};

function ProductLink({ link, language }) {
  return (
    <a href={link.href}>
      {language === "zh" ? link.labelZh || link.label : link.label}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

function AIProductCard({ product, language = "en", highlightedTargetId }) {
  const isZh = language === "zh";
  const anchorId = product.id.toLowerCase();
  const isHighlighted = highlightedTargetId === anchorId;
  const imageSrc = publicAsset(isZh ? product.imageZh || product.image : product.image);
  const imageAlt = isZh
    ? product.imageAltZh || product.imageAlt
    : product.imageAlt;
  const methods = isZh
    ? product.methodsZh || product.methods
    : product.methods;
  const metrics = product.metrics || [];
  const links = product.links?.filter((link) => link.href && link.href !== "#") || [];
  const detailRows = [
    {
      label: isZh ? "问题场景" : "Problem",
      value: isZh ? product.problemZh || product.problem : product.problem,
    },
    {
      label: isZh ? "系统设计" : "System",
      value: isZh ? product.systemZh || product.system : product.system,
    },
    {
      label: isZh ? "成果 / 评测" : "Outcome / Evaluation",
      value: isZh ? product.evidenceZh || product.evidence : product.evidence,
    },
    {
      label: isZh ? "我的角色" : "My Role",
      value: isZh ? product.roleZh || product.role : product.role,
    },
  ].filter((row) => row.value);

  return (
    <article
      id={anchorId}
      data-archive-anchor={anchorId}
      className={`ai-product-card ${product.featured ? "is-featured" : ""} ${accentClasses[product.accent] || ""} ${isHighlighted ? "is-highlighted" : ""}`}
      tabIndex="-1"
    >
      <div className="card-image-wrap">
        <img src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" />
        <span>{product.id}</span>
      </div>

      <div className="ai-card-body">
        <div>
          {product.eyebrow && (
            <p className="ai-card-eyebrow">
              {isZh ? product.eyebrowZh || product.eyebrow : product.eyebrow}
            </p>
          )}
          <h3>{isZh ? product.titleZh : product.title}</h3>
          <p className="card-title-zh">{isZh ? product.title : product.titleZh}</p>
        </div>
        {metrics.length > 0 && (
          <div className="ai-metric-strip" aria-label={isZh ? "产品指标" : "Product metrics"}>
            {metrics.map((metric) => (
              <div key={`${metric.value}-${metric.label}`}>
                <strong>{metric.value}</strong>
                <span>{isZh ? metric.labelZh || metric.label : metric.label}</span>
              </div>
            ))}
          </div>
        )}
        <div className="card-purpose">
          <p>{isZh ? product.purposeZh : product.purpose}</p>
        </div>
        <dl className="compact-details">
          {detailRows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
          {methods?.length > 0 && (
            <div>
              <dt>{isZh ? "方法 / 工具" : "Methods / Tools"}</dt>
              <dd>{methods.join(" · ")}</dd>
            </div>
          )}
          {product.status && (
            <div>
              <dt>{isZh ? "展示定位" : "Presentation Focus"}</dt>
              <dd>{isZh ? product.statusZh || product.status : product.status}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="ai-flow" aria-hidden="true">
        <svg viewBox="0 0 600 34" preserveAspectRatio="none">
          <path d="M4 19C88 5 126 30 207 16C283 4 346 29 419 15C487 2 540 21 596 10" />
        </svg>
        <div>
          <span>{isZh ? "输入" : "Input"}</span>
          <span>{isZh ? "处理" : "Process"}</span>
          <span>{isZh ? "输出" : "Output"}</span>
          <span>{isZh ? "评估" : "Evaluation"}</span>
        </div>
      </div>

      {links.length > 0 && (
        <div className="card-links">
          {links.map((link) => (
            <ProductLink key={link.label} link={link} language={language} />
          ))}
        </div>
      )}
    </article>
  );
}

export default AIProductCard;
