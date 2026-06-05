import SectionIntro from "./SectionIntro";
import { cv } from "../data/cv";

function CVSection({ language = "en" }) {
  const isZh = language === "zh";

  return (
    <section id="cv" className="archive-section cv-section">
      <SectionIntro
        index="06"
        eyebrow="Formal dossier / 正式履历"
        title="Curriculum Vitae"
        titleZh="履历"
        description="The formal record lives here. Company names and chronology are kept in this section so the rest of the archive can remain organized by work itself."
        descriptionZh="正式记录放在这里。公司名称与时间顺序只在本节出现，让档案馆的其他部分仍然按作品本身组织。"
        language={language}
      />

      <div className="cv-paper">
        <div className="cv-paper-head">
          <div>
            <p>The Archive of Li Li</p>
            <h3>Li Li · 李莉</h3>
            <span>
              {isZh
                ? "数据分析 · AI 产品 · 研究工作流"
                : "Data Analytics · AI Products · Research Workflows"}
            </span>
          </div>
          <a
            href={cv.downloadHref}
            onClick={(event) => event.preventDefault()}
            aria-label="Download CV placeholder link"
          >
            {isZh ? "下载履历" : "Download CV"}
            <small>{isZh ? "PDF 链接占位" : "PDF link placeholder"}</small>
          </a>
        </div>

        <div className="cv-block">
          <h4>{isZh ? "教育背景" : "Education"} <span>{isZh ? "Education" : "教育背景"}</span></h4>
          <div className="cv-list">
            {cv.education.map((item) => (
              <article key={`${item.institution}-${item.period}`}>
                <div>
                  <h5>
                    {isZh ? item.institutionZh : item.institution}
                    <span>{isZh ? item.institution : item.institutionZh}</span>
                  </h5>
                  <p>{isZh ? item.degreeZh : item.degree}</p>
                  {item.note && <small>{isZh ? item.noteZh : item.note}</small>}
                </div>
                <aside>
                  <span>{item.period}</span>
                  <small>{isZh ? item.locationZh || item.location : item.location}</small>
                </aside>
              </article>
            ))}
          </div>
        </div>

        <div className="cv-block">
          <h4>{isZh ? "工作经历" : "Work Experience"} <span>{isZh ? "Work Experience" : "工作经历"}</span></h4>
          <div className="cv-list">
            {cv.experience.map((item) => (
              <article key={`${item.company}-${item.period}`}>
                <div>
                  <h5>
                    {isZh ? item.companyZh : item.company}
                    <span>{isZh ? item.company : item.companyZh}</span>
                  </h5>
                  <p>{isZh ? item.roleZh : item.role}</p>
                  <ul>
                    {(isZh ? item.bulletsZh || item.bullets : item.bullets).map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
                <aside>
                  <span>{item.period}</span>
                  <small>{isZh ? item.locationZh || item.location : item.location}</small>
                </aside>
              </article>
            ))}
          </div>
        </div>

        <div className="cv-grid">
          <div className="cv-block">
            <h4>{isZh ? "技能" : "Skills"} <span>{isZh ? "Skills" : "技能"}</span></h4>
            <div className="cv-skill-list">
              {cv.skills.map((skill) => (
                <article key={skill.group}>
                  <h5>{isZh ? skill.groupZh || skill.group : skill.group}</h5>
                  <p>{isZh ? skill.itemsZh || skill.items : skill.items}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="cv-block">
            <h4>{isZh ? "精选项目" : "Selected Projects"} <span>{isZh ? "Selected Projects" : "精选项目"}</span></h4>
            <div className="cv-project-list">
              {cv.selectedProjects.map((project) => (
                <article key={project.title}>
                  <h5>{isZh ? project.titleZh || project.title : project.title}</h5>
                  <p>{isZh ? project.detailZh || project.detail : project.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CVSection;
