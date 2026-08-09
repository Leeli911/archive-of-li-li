import { useEffect, useState } from "react";
import SectionIntro from "./SectionIntro";
import { aboutArchive } from "../data/cv";
import { publicAsset } from "../utils/assets";

const archiveVisual = {
  src: "/images/drawings/li-li-lily-river-archive.svg",
  alt: "Original path map connecting Nanning, Shanghai, and Uppsala",
};

function AboutSection({ language = "en" }) {
  const isZh = language === "zh";
  const [visualSrc, setVisualSrc] = useState("");

  useEffect(() => {
    let isActive = true;
    const source = publicAsset(archiveVisual.src);
    const image = new Image();

    image.onload = () => {
      if (isActive) setVisualSrc(source);
    };
    image.onerror = () => {
      if (isActive) setVisualSrc("");
    };
    image.src = source;

    return () => {
      isActive = false;
      image.onload = null;
      image.onerror = null;
    };
  }, []);

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

      <div className={`about-layout ${visualSrc ? "has-visual" : "is-text-only"}`}>
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

        {visualSrc && (
          <div className="drawing-collage drawing-collage--single" aria-label="Personal path map">
            <figure className="drawing drawing-one">
              <img
                src={visualSrc}
                alt={archiveVisual.alt}
                decoding="async"
                onError={() => setVisualSrc("")}
              />
            </figure>
            <p>
              {isZh
                ? "个人路径地图 · 南宁、上海、乌普萨拉"
                : "Personal path map · Nanning, Shanghai, Uppsala"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default AboutSection;
