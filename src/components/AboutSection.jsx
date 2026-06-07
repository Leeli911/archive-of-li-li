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
        eyebrow="Archive note / 档案说明"
        title="About"
        titleZh="关于我"
        description="Not a copied résumé timeline, but a note about the person, the path, the current questions, and the logic of this archive."
        descriptionZh="这不是简历时间轴的复制，而是一则关于人、路径、当下问题与档案馆逻辑的说明。"
        language={language}
      />

      <div className="about-layout">
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

        <div className="about-notes">
          {aboutArchive.map((note, index) => (
            <article key={note.title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{isZh ? note.titleZh : note.title}</h3>
                <p className="about-title-zh">{isZh ? note.title : note.titleZh}</p>
                <p>{isZh ? note.textZh : note.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
