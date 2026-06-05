import SectionIntro from "./SectionIntro";
import AIProductCard from "./AIProductCard";
import ResearchProjectCard from "./ResearchProjectCard";
import ProfessionalCaseCard from "./ProfessionalCaseCard";
import LifeArchiveCard from "./LifeArchiveCard";
import AboutSection from "./AboutSection";
import CVSection from "./CVSection";

function ArchiveOverlay({
  section,
  aiProducts,
  researchProjects,
  professionalCases,
  lifeArchive,
  onClose,
  isOpen,
  isSwitching,
  language = "en",
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
              eyebrow="Product drawers / 产品抽屉"
              title="AI Products"
              titleZh="AI 产品与工作流"
              description="Product experiments are kept here as evolving systems: what they are for, how they work, and what remains unresolved."
              descriptionZh="这里保存持续演化的产品实验：它们解决什么问题、如何工作，以及还有哪些问题尚未被回答。"
              language={language}
            />
            <div className="overlay-ai-grid">
              {aiProducts.map((product) => (
                <AIProductCard
                  key={product.id}
                  product={product}
                  language={language}
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
              description="Research belongs in its own cabinet, where questions, methods, materials, results, and uncertainty can remain visible."
              descriptionZh="研究被单独放进一个柜子里，让问题、方法、材料、结果与不确定性都保持可见。"
              language={language}
            />
            <div className="overlay-research-stack">
              {researchProjects.map((project) => (
                <ResearchProjectCard
                  key={project.id}
                  project={project}
                  language={language}
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
              description="Five years of analytics practice, organized as capability cases rather than company chronology."
              descriptionZh="五年数据分析实践。这里按能力案例整理，而不是按公司时间线排列。"
              language={language}
            />
            <div className="overlay-data-grid">
              {professionalCases.map((professionalCase) => (
                <ProfessionalCaseCard
                  key={professionalCase.id}
                  professionalCase={professionalCase}
                  language={language}
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
            <div className="overlay-life-wall">
              {lifeArchive.map((fragment) => (
                <LifeArchiveCard
                  key={fragment.id}
                  fragment={fragment}
                  language={language}
                />
              ))}
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
