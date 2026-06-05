function ProfessionalCaseCard({ professionalCase, language = "en" }) {
  const isZh = language === "zh";
  const sections = [
    {
      label: isZh ? "问题" : "Problem",
      value: isZh ? professionalCase.problemZh || professionalCase.problem : professionalCase.problem,
    },
    {
      label: isZh ? "行动" : "Action",
      value: isZh ? professionalCase.actionZh || professionalCase.action : professionalCase.action,
    },
    {
      label: isZh ? "结果" : "Result",
      value: isZh ? professionalCase.resultZh || professionalCase.result : professionalCase.result,
    },
  ];
  const skills = isZh
    ? professionalCase.skillsZh || professionalCase.skills
    : professionalCase.skills;

  return (
    <article className="professional-card">
      <div className="professional-card-head">
        <div>
          <span>{professionalCase.id}</span>
          <h3>{isZh ? professionalCase.titleZh : professionalCase.title}</h3>
          <p>{isZh ? professionalCase.title : professionalCase.titleZh}</p>
        </div>
        <img src={professionalCase.image} alt={professionalCase.imageAlt} />
      </div>

      <div className="par-structure">
        {sections.map((section) => (
          <section key={section.label}>
            <h4>{section.label}</h4>
            <p>{section.value}</p>
          </section>
        ))}
      </div>

      <div className="skills-row">
        <span>{isZh ? "能力体现" : "Skills demonstrated"}</span>
        <p>{skills.join(" · ")}</p>
      </div>
    </article>
  );
}

export default ProfessionalCaseCard;
