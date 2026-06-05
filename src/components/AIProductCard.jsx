const accentClasses = {
  terracotta: "accent-terracotta",
  moss: "accent-moss",
  powder: "accent-powder",
};

function PlaceholderLink({ link, language }) {
  return (
    <a
      href={link.href}
      onClick={(event) => event.preventDefault()}
      aria-label={`${link.label} placeholder link`}
    >
      {language === "zh" ? link.labelZh || link.label : link.label}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

function AIProductCard({ product, language = "en" }) {
  const isZh = language === "zh";
  const methods = isZh
    ? product.methodsZh || product.methods
    : product.methods;

  return (
    <article
      className={`ai-product-card ${accentClasses[product.accent] || ""}`}
    >
      <div className="card-image-wrap">
        <img src={product.image} alt={product.imageAlt} />
        <span>{product.id}</span>
      </div>

      <div className="ai-card-body">
        <div>
          <h3>{isZh ? product.titleZh : product.title}</h3>
          <p className="card-title-zh">{isZh ? product.title : product.titleZh}</p>
        </div>
        <div className="card-purpose">
          <p>{isZh ? product.purposeZh : product.purpose}</p>
        </div>
        <dl className="compact-details">
          <div>
            <dt>{isZh ? "角色" : "Role"}</dt>
            <dd>{isZh ? product.roleZh || product.role : product.role}</dd>
          </div>
          <div>
            <dt>{isZh ? "方法 / 工具" : "Methods / Tools"}</dt>
            <dd>{methods.join(" · ")}</dd>
          </div>
          <div>
            <dt>{isZh ? "结果 / 状态" : "Outcome / Status"}</dt>
            <dd>{isZh ? product.statusZh || product.status : product.status}</dd>
          </div>
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

      <div className="card-links">
        {product.links.map((link) => (
          <PlaceholderLink key={link.label} link={link} language={language} />
        ))}
      </div>
    </article>
  );
}

export default AIProductCard;
