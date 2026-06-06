import { useEffect, useRef, useState } from "react";

const pastelPalette = [
  "#D68C78",
  "#90AC8E",
  "#8FAAB8",
  "#ECC67C",
  "#F6F2E9",
];

const traceColors = [
  "rgba(214, 140, 120, 0.28)",
  "rgba(144, 172, 142, 0.26)",
  "rgba(143, 170, 184, 0.26)",
  "rgba(236, 198, 124, 0.28)",
];

const fragmentAssets = [
  "/images/drawings/li-li-lily-river-archive.svg",
  "/images/projects/placeholder-ai.svg",
  "/images/research/placeholder-research.svg",
  "/images/professional/placeholder-professional.svg",
  "/images/life/placeholder-life.svg",
  "/images/drawings/li-li-lily-river-archive.svg",
];

const fragmentBias = {
  "ai-products": [1, 0, 5, 3, 2],
  research: [2, 0, 5, 1, 4],
  "data-work": [3, 0, 1, 5, 2],
  "life-notes": [4, 0, 5, 2, 3],
  about: [0, 5, 4, 2, 1],
  cv: [0, 3, 5, 2, 1],
};

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function makeFragments(sectionId) {
  const count = Math.floor(randomBetween(2, 5));
  const preferred = fragmentBias[sectionId] || [0, 1, 2, 3, 4];

  return Array.from({ length: count }, (_, index) => {
    const useImage = Math.random() > 0.28;
    const assetIndex = preferred[index % preferred.length];
    const color = pastelPalette[Math.floor(Math.random() * pastelPalette.length)];

    return {
      id: `${sectionId}-${Date.now()}-${index}-${Math.random()}`,
      type: useImage ? "image" : "paper",
      src: fragmentAssets[assetIndex],
      color,
      left: randomBetween(44, 90),
      top: randomBetween(16, 82),
      width: randomBetween(120, 320),
      height: randomBetween(90, 260),
      rotate: randomBetween(-16, 16),
      opacity: randomBetween(0.42, 0.68),
      delay: randomBetween(0, 120),
    };
  });
}

function HomeCanvas({ sections, onOpenSection, language }) {
  const canvasRef = useRef(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [fragments, setFragments] = useState(() => makeFragments("about"));

  useEffect(() => {
    if (!hoveredSection) return undefined;

    setFragments(makeFragments(hoveredSection.id));
    const interval = window.setInterval(() => {
      setFragments(makeFragments(hoveredSection.id));
    }, 6500);

    return () => window.clearInterval(interval);
  }, [hoveredSection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frame;
    let fadeTimer;
    let drawing = false;
    let lastPoint = null;
    let traceColor = traceColors[0];

    const drawBase = () => {
      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "multiply";

      const blooms = [
        [width * 0.2, height * 0.22, Math.min(width, height) * 0.28, "#ECC67C"],
        [width * 0.62, height * 0.56, Math.min(width, height) * 0.36, "#90AC8E"],
        [width * 0.86, height * 0.18, Math.min(width, height) * 0.25, "#D68C78"],
        [width * 0.76, height * 0.82, Math.min(width, height) * 0.28, "#8FAAB8"],
      ];

      blooms.forEach(([x, y, radius, color]) => {
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `${color}46`);
        gradient.addColorStop(0.58, `${color}1f`);
        gradient.addColorStop(1, `${color}00`);
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      });

      const paths = [
        {
          start: [width * 0.05, height * 0.74],
          cp1: [width * 0.2, height * 0.38],
          cp2: [width * 0.35, height * 0.86],
          end: [width * 0.56, height * 0.43],
          color: "rgba(214, 140, 120, .38)",
          lineWidth: 1.8,
        },
        {
          start: [width * 0.18, height * 0.1],
          cp1: [width * 0.42, height * 0.16],
          cp2: [width * 0.62, height * 0.75],
          end: [width * 0.94, height * 0.2],
          color: "rgba(143, 170, 184, .28)",
          lineWidth: 1.6,
        },
        {
          start: [width * 0.32, height * 0.96],
          cp1: [width * 0.31, height * 0.58],
          cp2: [width * 0.82, height * 0.62],
          end: [width * 0.92, height * 0.88],
          color: "rgba(144, 172, 142, .32)",
          lineWidth: 1.5,
        },
      ];

      paths.forEach((path) => {
        context.beginPath();
        context.moveTo(...path.start);
        context.bezierCurveTo(...path.cp1, ...path.cp2, ...path.end);
        context.strokeStyle = path.color;
        context.lineWidth = path.lineWidth;
        context.lineCap = "round";
        context.stroke();
      });
      context.restore();
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawBase();
    };

    const getPoint = (event) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const drawPastelDust = (event, strength = 1) => {
      const point = getPoint(event);
      context.save();
      context.globalCompositeOperation = "multiply";

      const particleCount = Math.floor(10 * strength);
      for (let index = 0; index < particleCount; index += 1) {
        const radius = randomBetween(2, 8) * strength;
        const spread = randomBetween(26, 58) * strength;
        const x = point.x + randomBetween(-spread, spread);
        const y = point.y + randomBetween(-spread, spread);
        const color = traceColors[Math.floor(Math.random() * traceColors.length)];
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color.replace(/0\.\d+\)/, "0.32)"));
        gradient.addColorStop(1, color.replace(/0\.\d+\)/, "0)"));
        context.fillStyle = gradient;
        context.filter = `blur(${randomBetween(0.5, 2)}px)`;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }

      context.filter = "none";
      context.strokeStyle = traceColors[Math.floor(Math.random() * traceColors.length)].replace(
        /0\.\d+\)/,
        "0.34)",
      );
      context.lineWidth = randomBetween(0.7, 1.6);
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(point.x - 42 * strength, point.y + 10 * strength);
      context.bezierCurveTo(
        point.x - 14 * strength,
        point.y - 28 * strength,
        point.x + 30 * strength,
        point.y + 30 * strength,
        point.x + 58 * strength,
        point.y - 6 * strength,
      );
      context.stroke();
      context.restore();
    };

    const startDrawing = (event) => {
      drawing = true;
      lastPoint = getPoint(event);
      traceColor = traceColors[Math.floor(Math.random() * traceColors.length)];
      canvas.setPointerCapture(event.pointerId);
    };

    const drawTrace = (event) => {
      if (!drawing || !lastPoint) return;
      const point = getPoint(event);
      const distance = Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);
      const strength = Math.min(1.8, Math.max(0.45, distance / 70));

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        context.save();
        context.globalCompositeOperation = "multiply";
        context.strokeStyle = traceColor;
        context.lineWidth = 18 + strength * 8;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.shadowColor = traceColor;
        context.shadowBlur = 1.5;
        context.beginPath();
        context.moveTo(lastPoint.x, lastPoint.y);
        context.quadraticCurveTo(
          (lastPoint.x + point.x) / 2,
          (lastPoint.y + point.y) / 2,
          point.x,
          point.y,
        );
        context.stroke();
        drawPastelDust(event, strength);
        context.restore();
        lastPoint = point;
      });
    };

    const fadeTraces = () => {
      const { width, height } = canvas.getBoundingClientRect();
      context.save();
      context.globalCompositeOperation = "source-over";
      context.fillStyle = "rgba(246, 242, 233, 0.012)";
      context.fillRect(0, 0, width, height);
      context.restore();
    };

    const stopDrawing = () => {
      drawing = false;
      lastPoint = null;
    };

    resizeCanvas();
    fadeTimer = window.setInterval(fadeTraces, 240);
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("pointerdown", startDrawing);
    canvas.addEventListener("pointermove", drawTrace);
    canvas.addEventListener("pointerup", stopDrawing);
    canvas.addEventListener("pointercancel", stopDrawing);
    canvas.addEventListener("pointerleave", stopDrawing);

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(fadeTimer);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("pointerdown", startDrawing);
      canvas.removeEventListener("pointermove", drawTrace);
      canvas.removeEventListener("pointerup", stopDrawing);
      canvas.removeEventListener("pointercancel", stopDrawing);
      canvas.removeEventListener("pointerleave", stopDrawing);
    };
  }, []);

  const handleOpen = (event, section) => {
    onOpenSection(section, {
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <section
      id="home"
      className={`home-canvas-section ${language === "zh" ? "is-zh" : ""}`}
    >
      <canvas
        ref={canvasRef}
        className="home-canvas"
        aria-label="Interactive pastel paper canvas. Drag to leave soft traces."
      />
      <div className="home-vignette" aria-hidden="true" />

      <div className="fragment-field" aria-hidden="true">
        {fragments.map((fragment) => (
          <div
            key={fragment.id}
            className={`visual-fragment visual-fragment-${fragment.type}`}
            style={{
              "--fragment-left": `${fragment.left}%`,
              "--fragment-top": `${fragment.top}%`,
              "--fragment-width": `${fragment.width}px`,
              "--fragment-height": `${fragment.height}px`,
              "--fragment-rotate": `${fragment.rotate}deg`,
              "--fragment-opacity": fragment.opacity,
              "--fragment-delay": `${fragment.delay}ms`,
              "--fragment-color": fragment.color,
            }}
          >
            {fragment.type === "image" && <img src={fragment.src} alt="" />}
          </div>
        ))}
      </div>

      <div className={`home-copy ${language === "zh" ? "is-zh" : ""}`}>
        {language === "zh" ? (
          <>
            <h1 className="zh-home-title">
              <span>李莉的</span>
              <span>数字档案馆</span>
            </h1>
          </>
        ) : (
          <>
            <h1>
              The Archive
              <br />
              <em>of Li Li</em>
            </h1>
          </>
        )}
      </div>

      <nav className="home-menu archive-bloom-menu" aria-label="Archive rooms">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className="home-menu-item"
            type="button"
            onMouseEnter={() => setHoveredSection(section)}
            onFocus={() => setHoveredSection(section)}
            onClick={(event) => handleOpen(event, section)}
          >
            <span>0{index + 1}</span>
            <strong>{language === "zh" ? section.labelZh : section.label}</strong>
            <small>{language === "zh" ? section.label : section.labelZh}</small>
          </button>
        ))}
        <div className="archive-flowerpot" aria-hidden="true">
          <span />
        </div>
      </nav>
    </section>
  );
}

export default HomeCanvas;
