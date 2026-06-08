import { useState } from "react";

const root = { x: 690, y: 552 };

const branches = [
  {
    id: "ai-products",
    index: "01",
    indexTone: "rose",
    path: "M690 552 C640 486, 566 350, 472 238",
    highlightPath: "M690 552 C646 488, 572 354, 472 238",
    end: { x: 472, y: 238 },
    labelOffset: { x: 34, y: 12 },
    angle: -10,
    scale: 0.9,
  },
  {
    id: "research",
    index: "02",
    indexTone: "blue",
    path: "M690 552 C700 428, 704 278, 708 142",
    highlightPath: "M690 552 C706 430, 710 280, 708 142",
    end: { x: 708, y: 142 },
    labelOffset: { x: 34, y: 13 },
    angle: 4,
    scale: 0.94,
  },
  {
    id: "data-work",
    index: "03",
    indexTone: "green",
    path: "M690 552 C650 500, 620 420, 590 342",
    highlightPath: "M690 552 C656 502, 626 422, 590 342",
    end: { x: 590, y: 342 },
    labelOffset: { x: 34, y: 12 },
    angle: -4,
    scale: 0.84,
  },
  {
    id: "life-notes",
    index: "04",
    indexTone: "rose",
    path: "M690 552 C762 460, 840 330, 924 232",
    highlightPath: "M690 552 C768 462, 846 332, 924 232",
    end: { x: 924, y: 232 },
    labelOffset: { x: 0, y: 62 },
    labelAnchor: "middle",
    angle: 9,
    scale: 0.86,
  },
  {
    id: "about",
    index: "05",
    indexTone: "green",
    path: "M690 552 C732 510, 788 462, 846 414",
    highlightPath: "M690 552 C738 512, 794 464, 846 414",
    end: { x: 846, y: 414 },
    labelOffset: { x: 34, y: 12 },
    angle: 5,
    scale: 0.82,
  },
  {
    id: "cv",
    index: "06",
    indexTone: "blue",
    path: "M690 552 C762 552, 842 522, 920 496",
    highlightPath: "M690 552 C766 556, 846 526, 920 496",
    end: { x: 920, y: 496 },
    labelOffset: { x: 0, y: 56 },
    labelAnchor: "middle",
    angle: -8,
    scale: 0.78,
  },
];

const outerPetals = [
  { angle: -96, rx: 8.5, ry: 25, cy: -17, dx: -1.5, tone: "rose", delay: 0 },
  { angle: -66, rx: 9, ry: 27, cy: -18, dx: 0, tone: "mauve", delay: 28 },
  { angle: -34, rx: 10, ry: 28, cy: -18, dx: 1.2, tone: "rose", delay: 56 },
  { angle: -6, rx: 9, ry: 26, cy: -17, dx: -0.5, tone: "cream", delay: 84 },
  { angle: 25, rx: 10, ry: 27, cy: -18, dx: 0.6, tone: "rose", delay: 112 },
  { angle: 57, rx: 8.5, ry: 25, cy: -17, dx: -1, tone: "mauve", delay: 140 },
  { angle: 90, rx: 8, ry: 23, cy: -16, dx: 1, tone: "rose", delay: 168 },
  { angle: 126, rx: 7.5, ry: 22, cy: -15, dx: -0.8, tone: "cream", delay: 196 },
];

const midPetals = [
  { angle: -72, rx: 7, ry: 20, cy: -12, tone: "mid-rose", delay: 70 },
  { angle: -38, rx: 7.5, ry: 21, cy: -13, tone: "mid-cream", delay: 100 },
  { angle: -8, rx: 7, ry: 19, cy: -12, tone: "mid-rose", delay: 130 },
  { angle: 24, rx: 7.5, ry: 20, cy: -12, tone: "mid-mauve", delay: 160 },
  { angle: 58, rx: 7, ry: 19, cy: -12, tone: "mid-cream", delay: 190 },
  { angle: 92, rx: 6.5, ry: 18, cy: -11, tone: "mid-rose", delay: 220 },
];

const innerPetals = [
  { angle: -42, rx: 5.5, ry: 14, cy: -8, tone: "inner-cream", delay: 180 },
  { angle: -12, rx: 5, ry: 13, cy: -8, tone: "inner-rose", delay: 210 },
  { angle: 20, rx: 5.2, ry: 13, cy: -8, tone: "inner-cream", delay: 240 },
  { angle: 50, rx: 4.8, ry: 12, cy: -7, tone: "inner-yellow", delay: 270 },
];

function WaterLilyFlower() {
  return (
    <g className="water-lily-flower">
      {outerPetals.map((petal) => (
        <ellipse
          key={`outer-${petal.angle}`}
          className={`water-lily-petal petal-outer tone-${petal.tone}`}
          cx={petal.dx}
          cy={petal.cy}
          rx={petal.rx}
          ry={petal.ry}
          transform={`rotate(${petal.angle})`}
          style={{ "--petal-delay": `${petal.delay}ms` }}
        />
      ))}
      {midPetals.map((petal) => (
        <ellipse
          key={`mid-${petal.angle}`}
          className={`water-lily-petal petal-mid tone-${petal.tone}`}
          cx="0"
          cy={petal.cy}
          rx={petal.rx}
          ry={petal.ry}
          transform={`rotate(${petal.angle})`}
          style={{ "--petal-delay": `${petal.delay}ms` }}
        />
      ))}
      {innerPetals.map((petal) => (
        <ellipse
          key={`inner-${petal.angle}`}
          className={`water-lily-petal petal-inner tone-${petal.tone}`}
          cx="0"
          cy={petal.cy}
          rx={petal.rx}
          ry={petal.ry}
          transform={`rotate(${petal.angle})`}
          style={{ "--petal-delay": `${petal.delay}ms` }}
        />
      ))}
      <circle className="flower-core" cx="0" cy="0" r="4.2" />
      <path className="flower-core-line" d="M-5 1 C-2 -1, 2 -1, 5 1" />
      <path className="flower-core-line" d="M-2 4 C0 1, 2 1, 4 4" />
    </g>
  );
}

function ArchiveFlowerMap({ sections, language, onOpenSection, activeSectionId }) {
  const [hoveredId, setHoveredId] = useState(null);

  const sectionById = sections.reduce((lookup, section) => {
    lookup[section.id] = section;
    return lookup;
  }, {});

  const handleOpen = (event, branch) => {
    const section = sectionById[branch.id];
    if (!section) return;

    onOpenSection(section, {
      x: event.clientX || window.innerWidth * 0.66,
      y: event.clientY || window.innerHeight * 0.52,
    });
  };

  const handleKeyDown = (event, branch) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleOpen(event, branch);
  };

  const getLabel = (branch) => {
    const section = sectionById[branch.id];
    return language === "zh" ? section?.labelZh : section?.label;
  };

  const getAltLabel = (branch) => {
    const section = sectionById[branch.id];
    return language === "zh" ? section?.label : section?.labelZh;
  };

  return (
    <div className="archive-flower-map" aria-label="Archive flower navigation">
      <svg
        className="archive-garden-svg"
        viewBox="0 0 1000 700"
        role="presentation"
        aria-hidden="false"
      >
        <g className="garden-pot" aria-hidden="true">
          <ellipse className="garden-soil" cx={root.x} cy={root.y + 1} rx="118" ry="18" />
          <path className="garden-pot-rim" d="M558 540 C602 526, 778 526, 822 540" />
          <path className="garden-pot-rim-back" d="M570 544 C618 556, 762 556, 810 544" />
          <path
            className="garden-pot-body"
            d="M576 548 L618 672 C658 688, 722 688, 762 672 L804 548"
          />
          <path className="garden-pot-base" d="M628 682 C666 690, 714 690, 752 682" />
        </g>

        <g className="garden-root-lines" aria-hidden="true">
          <path d="M690 552 C672 566, 660 580, 650 600" />
          <path d="M690 552 C702 568, 712 584, 726 602" />
          <path d="M690 552 C686 572, 685 590, 682 610" />
        </g>

        <g className="garden-stem-highlights" aria-hidden="true">
          {branches.map((branch, branchIndex) => (
            <path
              key={`${branch.id}-highlight`}
              className={`garden-stem-highlight ${
                hoveredId === branch.id || activeSectionId === branch.id ? "is-hovered" : ""
              }`}
              d={branch.highlightPath}
              pathLength="1"
              style={{ "--grow-delay": `${520 + branchIndex * 140}ms` }}
            />
          ))}
        </g>

        <g className="garden-stems">
          {branches.map((branch, branchIndex) => (
            <path
              key={branch.id}
              className={`garden-stem ${
                hoveredId === branch.id || activeSectionId === branch.id ? "is-hovered" : ""
              }`}
              d={branch.path}
              pathLength="1"
              style={{ "--grow-delay": `${420 + branchIndex * 140}ms` }}
            />
          ))}
        </g>

        <g className="garden-flowers">
          {branches.map((branch, branchIndex) => {
            const label = getLabel(branch);
            const altLabel = getAltLabel(branch);
            const isActive = activeSectionId === branch.id;

            return (
              <g
                key={branch.id}
                className={`archive-branch branch-${branch.indexTone} ${
                  hoveredId === branch.id ? "is-hovered" : ""
                } ${isActive ? "is-active" : ""}`}
                role="button"
                tabIndex="0"
                aria-label={label}
                onMouseEnter={() => setHoveredId(branch.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(branch.id)}
                onBlur={() => setHoveredId(null)}
                onClick={(event) => handleOpen(event, branch)}
                onKeyDown={(event) => handleKeyDown(event, branch)}
                style={{ "--flower-delay": `${1130 + branchIndex * 140}ms` }}
              >
                <g
                  className="flower-head"
                  transform={`translate(${branch.end.x} ${branch.end.y}) rotate(${branch.angle}) scale(${branch.scale})`}
                >
                  <g className="flower-head-mark">
                    <WaterLilyFlower />
                  </g>
                </g>
                <g
                  className={`flower-index-badge index-${branch.indexTone}`}
                  transform={`translate(${branch.end.x - 62} ${branch.end.y - 30})`}
                >
                  <rect x="0" y="0" width="39" height="22" rx="11" />
                  <text x="19.5" y="15.5" textAnchor="middle">
                    {branch.index}
                  </text>
                </g>
                <text
                  className="flower-label"
                  x={branch.end.x + branch.labelOffset.x}
                  y={branch.end.y + branch.labelOffset.y}
                  textAnchor={branch.labelAnchor || "start"}
                >
                  {label}
                </text>
                <text
                  className="flower-alt-label"
                  x={branch.end.x + branch.labelOffset.x}
                  y={branch.end.y + branch.labelOffset.y + 25}
                  textAnchor={branch.labelAnchor || "start"}
                >
                  {altLabel}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export { root as archiveFlowerRoot, branches as archiveFlowerBranches };
export default ArchiveFlowerMap;
