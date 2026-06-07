import SectionIntro from "./SectionIntro";
import AIProductCard from "./AIProductCard";
import ResearchProjectCard from "./ResearchProjectCard";
import ProfessionalCaseCard from "./ProfessionalCaseCard";
import AboutSection from "./AboutSection";
import CVSection from "./CVSection";
import { publicAsset } from "../utils/assets";

function ArchiveOverlay({
  section,
  aiProducts,
  researchProjects,
  professionalCases,
  professionalOverview,
  onClose,
  isOpen,
  isSwitching,
  language = "en",
  targetId,
  highlightedTargetId,
}) {
  if (!section) return null;

  const isZh = language === "zh";

  return (
    <div className={`archive-overlay ${isSwitching ? "is-switching" : ""} ${isOpen ? "" : "is-closing"}`}>
      <button className="overlay-close" type="button" onClick={onClose}>
        {isZh ? "关闭" : "Close"}
      </button>

      <div className="archive-room">
        {section.id === "ai-products" && (
          <section className="archive-section overlay-section">
            <SectionIntro
              index="01"
              eyebrow="Product systems / 产品系统"
              title="AI Products"
              titleZh="AI 产品与工作流"
              description="AI work is presented here as product systems: the user problem, the workflow, the evaluation result, and the boundary that keeps the product honest."
              descriptionZh="这里把 AI 工作按产品系统展示：用户问题、工作流、评测结果，以及让产品保持诚实的能力边界。"
              language={language}
            />
            <div className="overlay-ai-grid">
              {aiProducts.map((product) => (
                <AIProductCard
                  key={product.id}
                  product={product}
                  language={language}
                  highlightedTargetId={highlightedTargetId}
                />
              ))}
            </div>
          </section>
        )}

        {section.id === "research" && (
          <section className="archive-section overlay-section">
            <SectionIntro
              index="02"
              eyebrow="Research cabinet / 研究柜"
              title="Research"
              titleZh="学术研究"
              description="Completed graduate research and ongoing directions, shown with research questions, methods, results, capability growth, and key visuals."
              descriptionZh="这里展示已完成的研究生阶段研究与持续跟进的方向，并按研究问题、方法、结果、能力沉淀和关键图表整理。"
              language={language}
            />
            <div className="overlay-research-stack">
              {researchProjects.map((project) => (
                <ResearchProjectCard
                  key={project.id}
                  project={project}
                  language={language}
                  targetId={targetId}
                  highlightedTargetId={highlightedTargetId}
                />
              ))}
            </div>
          </section>
        )}

        {section.id === "data-work" && (
          <section className="archive-section overlay-section">
            <SectionIntro
              index="03"
              eyebrow="Analytics practice / 数据实践"
              title="Data Work"
              titleZh="数据工作"
              description="Five years of analytics practice, organized as public-safe data product, analysis, and governance cases."
              descriptionZh="五年数据分析实践。这里按可公开展示的数据产品、经营分析与数据治理案例整理。"
              language={language}
            />
            {professionalOverview && (
              <div className="data-work-overview">
                <div className="data-work-overview-copy">
                  <p className="data-work-kicker">
                    {isZh ? "数据作品集" : "Data product portfolio"}
                  </p>
                  <h3>{isZh ? professionalOverview.titleZh : professionalOverview.title}</h3>
                  <p>
                    {isZh
                      ? professionalOverview.summaryZh
                      : professionalOverview.summary}
                  </p>
                  <p>
                    {isZh
                      ? professionalOverview.narrativeZh
                      : professionalOverview.narrative}
                  </p>
                  <div className="data-work-metrics">
                    {professionalOverview.metrics.map((metric) => (
                      <div key={metric.label}>
                        <strong>{metric.value}</strong>
                        <span>{isZh ? metric.labelZh : metric.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="data-work-overview-visual">
                  <img
                    src={publicAsset(professionalOverview.image)}
                    alt={professionalOverview.imageAlt}
                  />
                </div>
                <div className="data-work-framework">
                  {professionalOverview.framework.map((item) => (
                    <article key={item.label}>
                      <span>{isZh ? item.labelZh : item.label}</span>
                      <p>{isZh ? item.textZh : item.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
            <div className="overlay-data-grid">
              {professionalCases.map((professionalCase) => (
                <ProfessionalCaseCard
                  key={professionalCase.id}
                  professionalCase={professionalCase}
                  language={language}
                  highlightedTargetId={highlightedTargetId}
                />
              ))}
            </div>
          </section>
        )}

        {section.id === "life-notes" && (
          <section className="archive-section overlay-section life-section">
            <SectionIntro
              index="04"
              eyebrow="Selected fragments / 精选片段"
              title="Life Notes"
              titleZh="生活札记"
              description="A small collection of places, photos, museum visits, and personal observations."
              descriptionZh="少量城市、照片、博物馆和个人观察记录。"
              language={language}
            />
            <div className="life-maintenance-panel" role="status" aria-live="polite">
              <div className="life-maintenance-copy">
                <span>{isZh ? "待维护" : "Under maintenance"}</span>
                <h3>{isZh ? "照片札记正在整理中" : "Photo notes are being curated"}</h3>
                <p>
                  {isZh
                    ? "发布版本暂时保留这个入口。照片、地点文字和隐私边界会在后续整理完成后再开放。"
                    : "This public release keeps the section available while the photos, place notes, and privacy boundaries are being prepared."}
                </p>
              </div>
              <div
                className="life-maintenance-queue"
                aria-label={isZh ? "生活札记后续维护项" : "Life notes maintenance queue"}
              >
                <article>
                  <strong>01</strong>
                  <span>{isZh ? "照片筛选" : "Photo selection"}</span>
                  <p>{isZh ? "挑选适合公开展示的城市、展览与日常片段。" : "Select public-safe city, exhibition, and everyday fragments."}</p>
                </article>
                <article>
                  <strong>02</strong>
                  <span>{isZh ? "文字整理" : "Caption editing"}</span>
                  <p>{isZh ? "补齐时间、地点、观察文字和中英文说明。" : "Add dates, places, observations, and bilingual captions."}</p>
                </article>
                <article>
                  <strong>03</strong>
                  <span>{isZh ? "上线开放" : "Public release"}</span>
                  <p>{isZh ? "完成图片压缩与页面细节后再展示照片墙。" : "Publish the photo wall after image compression and layout polish."}</p>
                </article>
              </div>
            </div>
          </section>
        )}

        {section.id === "about" && (
          <div className="overlay-single-section">
            <AboutSection language={language} />
          </div>
        )}

        {section.id === "cv" && (
          <div className="overlay-single-section">
            <CVSection language={language} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ArchiveOverlay;
