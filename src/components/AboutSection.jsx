import SectionIntro from "./SectionIntro";
import { aboutArchive } from "../data/cv";
import { publicAsset } from "../utils/assets";

const archiveVisuals = [
  {
    src: "/images/drawings/li-li-lily-river-archive.svg",
    alt: "Original lily, river, and archive map drawing",
  },
  {
    src: "/images/life/placeholder-life.svg",
    alt: "Life archive placeholder paper",
  },
  {
    src: "/images/research/placeholder-research.svg",
    alt: "Research archive placeholder paper",
  },
];

function AboutSection({ language = "en" }) {
  const isZh = language === "zh";

  return (
    <section id="about" className="archive-section about-section">
      <SectionIntro
        index="05"
        eyebrow="About me / 关于我"
        title="Archive Note"
        titleZh="档案说明"
        description="Not a résumé rewritten as a website. This archive is a record of questions, projects, places, and ideas that have shaped how I think. It documents not only what I have done, but also what I keep returning to."
        descriptionZh="这不是把简历改写成网站，而是一份记录：问题、项目、地点与想法如何塑造我的思考方式。它记录的不只是我做过什么，也包括我不断回到哪些问题。"
        language={language}
      />

      <div className="about-layout">
        <div className="about-notes">
          {aboutArchive.map((note, index) => {
            const copy = isZh ? note.textZh : note.text;
            const paragraphs = Array.isArray(copy) ? copy : [copy];

            return (
              <article key={note.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{isZh ? note.titleZh : note.title}</h3>
                  <p className="about-title-zh">{isZh ? note.title : note.titleZh}</p>
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="drawing-collage" aria-label="Original lily river archive visual system">
          <figure className="drawing drawing-one">
            <img src={publicAsset(archiveVisuals[0].src)} alt={archiveVisuals[0].alt} />
          </figure>
          <figure className="drawing drawing-two">
            <img src={publicAsset(archiveVisuals[1].src)} alt={archiveVisuals[1].alt} />
          </figure>
          <figure className="drawing drawing-three">
            <img src={publicAsset(archiveVisuals[2].src)} alt={archiveVisuals[2].alt} />
          </figure>
          <p>
            {isZh
              ? "原创视觉草图 · 百合、河流与档案"
              : "Original visual notes · lily, river, archive"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
