import { useEffect, useRef } from "react";
import ArchiveFlowerMap from "./ArchiveFlowerMap";

const digitSeedText = "1231134753463242749329571943235739352015";

const digitPalette = [
  "214, 140, 120",
  "144, 172, 142",
  "143, 170, 184",
  "236, 198, 124",
  "190, 159, 146",
  "126, 111, 96",
];

const digitFieldConfig = {
  fontSize: 13,
  letterSpacing: 7,
  lineHeight: 30,
  marginX: 40,
  marginTop: 138,
  marginBottom: 42,
  explosionIntervalMin: 1650,
  explosionIntervalMax: 3200,
  radiusMin: 92,
  radiusMax: 210,
  forceMin: 5.5,
  forceMax: 15,
  returnForce: 0.018,
  rotationReturn: 0.024,
  friction: 0.895,
  maxParticles: 2200,
};

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomDigitColor() {
  return digitPalette[Math.floor(Math.random() * digitPalette.length)];
}

function HomeCanvas({ sections, onOpenSection, language }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frame;
    let width = 0;
    let height = 0;
    let particles = [];
    let bursts = [];
    let drawing = false;
    let lastPoint = null;
    let lastTime = performance.now();
    let lastPaint = 0;
    let nextExplosionAt = lastTime + 900;
    let lastManualExplosion = 0;

    const getDigitFont = () =>
      `${digitFieldConfig.fontSize}px "SFMono-Regular", Menlo, Consolas, "Kaiti SC", monospace`;

    const makeDigitParticles = () => {
      const nextParticles = [];
      const characters = Array.from(digitSeedText);
      const maxX = Math.max(digitFieldConfig.marginX, width - digitFieldConfig.marginX);
      const maxY = Math.max(
        digitFieldConfig.marginTop,
        height - digitFieldConfig.marginBottom,
      );

      context.save();
      context.font = getDigitFont();
      context.textBaseline = "alphabetic";

      let x = digitFieldConfig.marginX;
      let y = digitFieldConfig.marginTop;
      let guard = 0;

      while (y < maxY && nextParticles.length < digitFieldConfig.maxParticles && guard < 12000) {
        guard += 1;
        const character = characters[Math.floor(Math.random() * characters.length)];
        const characterWidth = Math.max(6, context.measureText(character).width);

        if (x + characterWidth > maxX) {
          x = digitFieldConfig.marginX;
          y += digitFieldConfig.lineHeight;
          continue;
        }

        nextParticles.push({
          character,
          homeX: x,
          homeY: y,
          x,
          y,
          previousX: x,
          previousY: y,
          vx: 0,
          vy: 0,
          angle: randomBetween(-0.02, 0.02),
          spin: 0,
          color: randomDigitColor(),
          alpha: 0,
          targetAlpha: randomBetween(0.14, 0.36),
        });

        x += characterWidth + digitFieldConfig.letterSpacing + randomBetween(-0.35, 0.55);
      }

      context.restore();
      return nextParticles;
    };

    const drawBase = () => {
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

    const drawBursts = (delta) => {
      bursts = bursts.filter((burst) => burst.age < burst.duration);

      bursts.forEach((burst) => {
        burst.age += delta;
        const progress = Math.min(1, burst.age / burst.duration);
        const radius = burst.radius * (0.2 + progress * 0.9);

        context.save();
        context.globalCompositeOperation = "multiply";
        context.strokeStyle = `rgba(${burst.color}, ${0.16 * (1 - progress)})`;
        context.lineWidth = 1.2;
        context.setLineDash([2, 6]);
        context.beginPath();
        context.arc(burst.x, burst.y, radius, 0, Math.PI * 2);
        context.stroke();
        context.restore();
      });
    };

    const explodeAt = (x, y, options = {}) => {
      const radius = options.radius || randomBetween(
        digitFieldConfig.radiusMin,
        digitFieldConfig.radiusMax,
      );
      const force = options.force || randomBetween(
        digitFieldConfig.forceMin,
        digitFieldConfig.forceMax,
      );
      const burstColor = randomDigitColor();

      bursts.push({
        x,
        y,
        radius,
        color: burstColor,
        age: 0,
        duration: randomBetween(520, 820),
      });

      particles.forEach((particle) => {
        const dx = particle.x - x;
        const dy = particle.y - y;
        const distance = Math.hypot(dx, dy);

        if (distance > radius) return;

        const falloff = Math.pow(1 - distance / radius, 2.15);
        const randomDirection = distance < 1 ? randomBetween(0, Math.PI * 2) : Math.atan2(dy, dx);
        const direction = randomDirection + randomBetween(-0.75, 0.75) * falloff;
        const power = force * falloff * randomBetween(0.56, 1.38);

        particle.vx += Math.cos(direction) * power;
        particle.vy += Math.sin(direction) * power;
        particle.spin += randomBetween(-0.28, 0.28) * falloff;
        particle.color = randomDigitColor();
        particle.targetAlpha = randomBetween(0.24, 0.62);
      });
    };

    const renderParticles = (delta) => {
      context.save();
      context.font = getDigitFont();
      context.textBaseline = "alphabetic";
      context.globalCompositeOperation = "multiply";

      particles.forEach((particle) => {
        particle.previousX = particle.x;
        particle.previousY = particle.y;

        const homeDx = particle.homeX - particle.x;
        const homeDy = particle.homeY - particle.y;

        particle.vx += homeDx * digitFieldConfig.returnForce;
        particle.vy += homeDy * digitFieldConfig.returnForce;
        particle.vx *= digitFieldConfig.friction;
        particle.vy *= digitFieldConfig.friction;
        particle.x += particle.vx * (delta / 16.67);
        particle.y += particle.vy * (delta / 16.67);

        particle.spin += -particle.angle * digitFieldConfig.rotationReturn;
        particle.spin *= 0.88;
        particle.angle += particle.spin * (delta / 16.67);
        particle.alpha += (particle.targetAlpha - particle.alpha) * 0.025;

        const speed = Math.hypot(particle.x - particle.previousX, particle.y - particle.previousY);
        if (speed > 0.22) {
          context.save();
          context.strokeStyle = `rgba(${particle.color}, ${Math.min(0.24, speed * 0.018)})`;
          context.lineWidth = Math.min(1.4, 0.45 + speed * 0.045);
          context.lineCap = "round";
          context.beginPath();
          context.moveTo(particle.previousX, particle.previousY);
          context.lineTo(particle.x, particle.y);
          context.stroke();
          context.restore();
        }

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.angle);
        context.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
        context.fillText(particle.character, 0, 0);
        context.restore();
      });

      context.restore();
    };

    const animate = (time) => {
      frame = requestAnimationFrame(animate);
      if (document.hidden || time - lastPaint < 32) return;

      const delta = Math.min(50, time - lastTime || 33.34);
      lastTime = time;
      lastPaint = time;

      context.clearRect(0, 0, width, height);
      drawBase();
      drawBursts(delta);
      renderParticles(delta);

      if (time >= nextExplosionAt && particles.length) {
        explodeAt(
          randomBetween(digitFieldConfig.marginX, Math.max(digitFieldConfig.marginX, width - digitFieldConfig.marginX)),
          randomBetween(digitFieldConfig.marginTop, Math.max(digitFieldConfig.marginTop, height - digitFieldConfig.marginBottom)),
        );
        nextExplosionAt = time + randomBetween(
          digitFieldConfig.explosionIntervalMin,
          digitFieldConfig.explosionIntervalMax,
        );
      }

    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = makeDigitParticles();
      bursts = [];
    };

    const getPoint = (event) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const startDrawing = (event) => {
      drawing = true;
      lastPoint = getPoint(event);
      explodeAt(lastPoint.x, lastPoint.y, {
        radius: randomBetween(110, 190),
        force: randomBetween(7, 16),
      });
      lastManualExplosion = performance.now();
      canvas.setPointerCapture(event.pointerId);
    };

    const drawTrace = (event) => {
      if (!drawing || !lastPoint) return;
      const point = getPoint(event);
      const distance = Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);
      const now = performance.now();

      if (distance > 12 && now - lastManualExplosion > 120) {
        explodeAt(point.x, point.y, {
          radius: randomBetween(72, 150),
          force: randomBetween(4.5, 10.5),
        });
        lastManualExplosion = now;
      }

      lastPoint = point;
    };

    const stopDrawing = () => {
      drawing = false;
      lastPoint = null;
    };

    resizeCanvas();
    frame = requestAnimationFrame(animate);
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("pointerdown", startDrawing, { passive: true });
    canvas.addEventListener("pointermove", drawTrace, { passive: true });
    canvas.addEventListener("pointerup", stopDrawing, { passive: true });
    canvas.addEventListener("pointercancel", stopDrawing, { passive: true });
    canvas.addEventListener("pointerleave", stopDrawing, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("pointerdown", startDrawing);
      canvas.removeEventListener("pointermove", drawTrace);
      canvas.removeEventListener("pointerup", stopDrawing);
      canvas.removeEventListener("pointercancel", stopDrawing);
      canvas.removeEventListener("pointerleave", stopDrawing);
    };
  }, []);

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

      <ArchiveFlowerMap
        sections={sections}
        language={language}
        onOpenSection={onOpenSection}
      />
    </section>
  );
}

export default HomeCanvas;
