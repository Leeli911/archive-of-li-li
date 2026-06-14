import { useEffect, useRef } from "react";
import ArchiveFlowerMap from "./ArchiveFlowerMap";

const digitSeedText = "1231134753463242749329571943235739352015";

const digitPalettes = {
  base: [
    "96, 82, 72",
    "116, 94, 82",
    "136, 108, 94",
    "150, 121, 110",
  ],
  cool: [
    "94, 126, 96",
    "88, 116, 130",
    "112, 135, 132",
  ],
  accent: [
    "164, 92, 78",
    "166, 129, 64",
  ],
};

const digitFieldConfig = {
  fontSize: 13,
  letterSpacing: 7,
  lineHeight: 30,
  marginX: 40,
  marginTop: 138,
  marginBottom: 42,
  explosionIntervalMin: 8200,
  explosionIntervalMax: 14000,
  radiusMin: 72,
  radiusMax: 170,
  forceMin: 4.5,
  forceMax: 11,
  returnForce: 0.018,
  rotationReturn: 0.024,
  friction: 0.895,
  maxParticles: 1150,
  largeParticleCap: 920,
  desktopParticleCap: 760,
  tabletParticleCap: 560,
  mobileParticleCap: 360,
  reducedMotionParticleCap: 140,
  particleAreaDivisor: 1150,
  dragFrameInterval: 16,
  activeFrameInterval: 24,
  idleFrameInterval: 48,
  pausedFrameDelay: 320,
  interactionBoostMs: 900,
  baseAlphaMin: 0.28,
  baseAlphaMax: 0.56,
  burstAlphaMin: 0.3,
  burstAlphaMax: 0.64,
  traceMinAlpha: 0.16,
  traceMaxAlpha: 0.32,
  faintMinAlpha: 0.06,
  faintMaxAlpha: 0.12,
  accentMinAlpha: 0.34,
  accentMaxAlpha: 0.46,
};

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomDigitColor() {
  const roll = Math.random();
  const palette =
    roll < 0.7
      ? digitPalettes.base
      : roll < 0.9
        ? digitPalettes.cool
        : digitPalettes.accent;

  return palette[Math.floor(Math.random() * palette.length)];
}

function getParticleLimit(width, height, prefersReducedMotion) {
  if (prefersReducedMotion) return digitFieldConfig.reducedMotionParticleCap;

  const areaBudget = Math.round((width * height) / digitFieldConfig.particleAreaDivisor);
  let viewportCap = digitFieldConfig.largeParticleCap;

  if (width < 640) {
    viewportCap = digitFieldConfig.mobileParticleCap;
  } else if (width < 1024) {
    viewportCap = digitFieldConfig.tabletParticleCap;
  } else if (width < 1440) {
    viewportCap = digitFieldConfig.desktopParticleCap;
  }

  return Math.max(180, Math.min(viewportCap, areaBudget));
}

function getCanvasPixelRatio(width) {
  const deviceRatio = window.devicePixelRatio || 1;
  const ratioCap = width < 760 ? 1.35 : 1.5;

  return Math.min(deviceRatio, ratioCap, 2);
}

function getReadabilityFactor(x, y, width) {
  const inHeaderBand = y < digitFieldConfig.marginTop - 18;
  const inTitleBand =
    width < 760
      ? y < 360
      : x < Math.min(760, width * 0.56) && y < 430;

  if (inHeaderBand) return 0.34;
  if (inTitleBand) return 0.48;
  return 1;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function ellipseInfluence(x, y, zone) {
  const dx = (x - zone.x) / zone.rx;
  const dy = (y - zone.y) / zone.ry;
  const distance = dx * dx + dy * dy;

  if (distance >= 1) return 0;

  return Math.pow(1 - distance, zone.softness || 1.35);
}

function getEdgeFactor(x, y, width, height) {
  const edgeDistance = Math.min(x, y, width - x, height - y);

  return clamp(edgeDistance / 150, 0.42, 1);
}

function getBaseDensity(x, y, width, height, zones) {
  const readabilityFactor = getReadabilityFactor(x, y, width);
  const archiveMapBias =
    x > width * 0.5 && y > digitFieldConfig.marginTop ? 0.18 : 0;
  let density = 0.58 + archiveMapBias;

  density *= getEdgeFactor(x, y, width, height);
  density *= 0.72 + readabilityFactor * 0.28;

  zones.voids.forEach((zone) => {
    density *= 1 - ellipseInfluence(x, y, zone) * zone.strength;
  });

  zones.clusters.forEach((zone) => {
    density += ellipseInfluence(x, y, zone) * zone.strength;
  });

  return clamp(density, 0.05, 0.92);
}

function makeDensityZones(width, height) {
  return {
    voids: [
      {
        x: Math.min(width * 0.3, 430),
        y: Math.min(height * 0.36, 320),
        rx: Math.min(width * 0.36, 520),
        ry: Math.min(height * 0.28, 270),
        strength: 0.72,
        softness: 1.15,
      },
      {
        x: width * randomBetween(0.06, 0.16),
        y: height * randomBetween(0.72, 0.88),
        rx: width * randomBetween(0.12, 0.2),
        ry: height * randomBetween(0.12, 0.2),
        strength: randomBetween(0.35, 0.5),
        softness: randomBetween(1.2, 1.8),
      },
      {
        x: width * randomBetween(0.56, 0.76),
        y: height * randomBetween(0.54, 0.78),
        rx: width * randomBetween(0.12, 0.2),
        ry: height * randomBetween(0.1, 0.18),
        strength: randomBetween(0.22, 0.38),
        softness: randomBetween(1.4, 2),
      },
    ],
    clusters: [
      {
        x: width * randomBetween(0.58, 0.78),
        y: height * randomBetween(0.2, 0.42),
        rx: width * randomBetween(0.16, 0.25),
        ry: height * randomBetween(0.16, 0.26),
        strength: randomBetween(0.18, 0.28),
        softness: randomBetween(1.25, 1.8),
      },
      {
        x: width * randomBetween(0.66, 0.9),
        y: height * randomBetween(0.6, 0.82),
        rx: width * randomBetween(0.14, 0.22),
        ry: height * randomBetween(0.1, 0.18),
        strength: randomBetween(0.14, 0.24),
        softness: randomBetween(1.35, 2),
      },
    ],
  };
}

function randomDigitAlpha() {
  const roll = Math.random();

  if (roll < 0.16) {
    return randomBetween(digitFieldConfig.faintMinAlpha, digitFieldConfig.faintMaxAlpha);
  }

  if (roll > 0.86) {
    return randomBetween(digitFieldConfig.accentMinAlpha, digitFieldConfig.accentMaxAlpha);
  }

  return randomBetween(digitFieldConfig.traceMinAlpha, digitFieldConfig.traceMaxAlpha);
}

function HomeCanvas({ sections, onOpenSection, language, activeSectionId, isPaused = false }) {
  const canvasRef = useRef(null);
  const pausedRef = useRef(isPaused);
  const pauseAnimationRef = useRef(null);
  const resumeAnimationRef = useRef(null);

  useEffect(() => {
    pausedRef.current = isPaused;
    if (isPaused) {
      pauseAnimationRef.current?.();
    } else {
      resumeAnimationRef.current?.();
    }
  }, [isPaused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const baseCanvas = document.createElement("canvas");
    const baseContext = baseCanvas.getContext("2d");
    let animationFrame = 0;
    let idleTimer = 0;
    let resizeTimer = 0;
    let pixelRatio = 1;
    let width = 0;
    let height = 0;
    let particles = [];
    let bursts = [];
    let particleLimit = digitFieldConfig.maxParticles;
    let prefersReducedMotion = reducedMotionQuery.matches;
    let isPageVisible = !document.hidden;
    let canvasVisible = true;
    let drawing = false;
    let lastPoint = null;
    let pendingPoint = null;
    let lastTime = performance.now();
    let lastPaint = 0;
    let nextExplosionAt = lastTime + 900;
    let lastManualExplosion = 0;
    let activeUntil = 0;

    const resetCanvasTransform = () => {
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const clearScheduledFrame = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }

      if (idleTimer) {
        window.clearTimeout(idleTimer);
        idleTimer = 0;
      }
    };

    const scheduleFrame = (delay = 0) => {
      if (!isPageVisible) return;

      clearScheduledFrame();

      if (delay > 0) {
        idleTimer = window.setTimeout(() => {
          idleTimer = 0;
          animationFrame = window.requestAnimationFrame(animate);
        }, delay);
        return;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const markInteraction = (time = performance.now()) => {
      activeUntil = Math.max(activeUntil, time + digitFieldConfig.interactionBoostMs);
    };

    const getDigitFont = () =>
      `${digitFieldConfig.fontSize}px "SFMono-Regular", Menlo, Consolas, "Kaiti SC", monospace`;

    const makeDigitParticles = () => {
      const candidates = [];
      const characters = Array.from(digitSeedText);
      const zones = makeDensityZones(width, height);
      const maxX = Math.max(digitFieldConfig.marginX, width - digitFieldConfig.marginX);
      const maxY = Math.max(
        digitFieldConfig.marginTop,
        height - digitFieldConfig.marginBottom,
      );

      context.save();
      context.font = getDigitFont();
      context.textBaseline = "alphabetic";

      let y = digitFieldConfig.marginTop + randomBetween(-12, 16);
      let rowIndex = 0;
      let guard = 0;

      while (y < maxY && guard < 16000) {
        const rowDrift = randomBetween(-18, 22);
        const rowWave = randomBetween(-4.5, 4.5);
        const rowDensitySwing = randomBetween(0.86, 1.12);
        let x =
          digitFieldConfig.marginX +
          rowDrift +
          randomBetween(-16, 28) +
          (rowIndex % 3) * randomBetween(-7, 9);

        while (x < maxX && guard < 16000) {
          guard += 1;
          const character = characters[Math.floor(Math.random() * characters.length)];
          const characterWidth = Math.max(6, context.measureText(character).width);

          if (x + characterWidth > maxX) break;

          const jitterX = randomBetween(-7.5, 8.5);
          const jitterY =
            randomBetween(-7.5, 7.5) +
            Math.sin(rowIndex * 0.9 + x * 0.006) * rowWave;
          const particleX = clamp(
            x + jitterX,
            digitFieldConfig.marginX * 0.58,
            maxX,
          );
          const particleY = clamp(
            y + jitterY,
            digitFieldConfig.marginTop * 0.72,
            maxY,
          );
          const density = getBaseDensity(particleX, particleY, width, height, zones);

          if (Math.random() <= density * rowDensitySwing) {
            const readabilityFactor = getReadabilityFactor(particleX, particleY, width);
            const densityAlphaFactor = clamp(0.84 + density * 0.24, 0.78, 1.06);
            const targetAlpha =
              randomDigitAlpha() * readabilityFactor * densityAlphaFactor;

            candidates.push({
              character,
              homeX: particleX,
              homeY: particleY,
              x: particleX,
              y: particleY,
              previousX: particleX,
              previousY: particleY,
              vx: 0,
              vy: 0,
              angle: randomBetween(-0.026, 0.026),
              spin: 0,
              color: randomDigitColor(),
              alpha: prefersReducedMotion ? targetAlpha : 0,
              targetAlpha,
              readabilityFactor,
            });
          }

          x +=
            characterWidth +
            digitFieldConfig.letterSpacing +
            randomBetween(-4.5, 6.5);
        }

        y += digitFieldConfig.lineHeight + randomBetween(-6, 8);
        rowIndex += 1;
      }

      context.restore();

      if (candidates.length <= particleLimit) return candidates;

      const sampledParticles = [];
      const samplePool = [...candidates];

      for (let index = 0; index < particleLimit; index += 1) {
        const swapIndex = index + Math.floor(Math.random() * (samplePool.length - index));
        const selectedParticle = samplePool[swapIndex];

        samplePool[swapIndex] = samplePool[index];
        samplePool[index] = selectedParticle;
        sampledParticles.push(selectedParticle);
      }

      return sampledParticles;
    };

    const drawBase = (targetContext) => {
      targetContext.save();
      targetContext.globalCompositeOperation = "multiply";

      const blooms = [
        [width * 0.2, height * 0.22, Math.min(width, height) * 0.28, "#ECC67C"],
        [width * 0.62, height * 0.56, Math.min(width, height) * 0.36, "#90AC8E"],
        [width * 0.86, height * 0.18, Math.min(width, height) * 0.25, "#D68C78"],
        [width * 0.76, height * 0.82, Math.min(width, height) * 0.28, "#8FAAB8"],
      ];

      blooms.forEach(([x, y, radius, color]) => {
        const gradient = targetContext.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `${color}46`);
        gradient.addColorStop(0.58, `${color}1f`);
        gradient.addColorStop(1, `${color}00`);
        targetContext.fillStyle = gradient;
        targetContext.beginPath();
        targetContext.arc(x, y, radius, 0, Math.PI * 2);
        targetContext.fill();
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
        targetContext.beginPath();
        targetContext.moveTo(...path.start);
        targetContext.bezierCurveTo(...path.cp1, ...path.cp2, ...path.end);
        targetContext.strokeStyle = path.color;
        targetContext.lineWidth = path.lineWidth;
        targetContext.lineCap = "round";
        targetContext.stroke();
      });
      targetContext.restore();
    };

    const renderBase = () => {
      if (baseContext && baseCanvas.width && baseCanvas.height) {
        context.drawImage(baseCanvas, 0, 0, width, height);
        return;
      }

      drawBase(context);
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
      const radiusSq = radius * radius;
      const inverseRadius = 1 / radius;

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
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq > radiusSq) return;

        const distance = Math.sqrt(distanceSq);
        const falloff = Math.pow(1 - distance * inverseRadius, 2.15);
        const randomDirection = distance < 1 ? randomBetween(0, Math.PI * 2) : Math.atan2(dy, dx);
        const direction = randomDirection + randomBetween(-0.75, 0.75) * falloff;
        const power = force * falloff * randomBetween(0.56, 1.38);

        particle.vx += Math.cos(direction) * power;
        particle.vy += Math.sin(direction) * power;
        particle.spin += randomBetween(-0.28, 0.28) * falloff;
        particle.color = randomDigitColor();
        particle.targetAlpha =
          randomBetween(digitFieldConfig.burstAlphaMin, digitFieldConfig.burstAlphaMax) *
          particle.readabilityFactor;
      });
    };

    const renderParticles = (delta) => {
      resetCanvasTransform();
      context.font = getDigitFont();
      context.textBaseline = "alphabetic";
      context.globalCompositeOperation = "source-over";

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

        const speedX = particle.x - particle.previousX;
        const speedY = particle.y - particle.previousY;
        const speedSq = speedX * speedX + speedY * speedY;

        if (speedSq > 0.0484) {
          const speed = Math.sqrt(speedSq);
          context.strokeStyle = `rgba(${particle.color}, ${Math.min(0.24, speed * 0.018)})`;
          context.lineWidth = Math.min(1.4, 0.45 + speed * 0.045);
          context.lineCap = "round";
          context.beginPath();
          context.moveTo(particle.previousX, particle.previousY);
          context.lineTo(particle.x, particle.y);
          context.stroke();
        }

        context.translate(particle.x, particle.y);
        context.rotate(particle.angle);
        context.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
        context.fillText(particle.character, 0, 0);
        resetCanvasTransform();
      });

      context.globalCompositeOperation = "source-over";
    };

    const animate = (time) => {
      animationFrame = 0;

      if (!isPageVisible) {
        lastTime = time;
        return;
      }

      const isAnimationPaused = !canvasVisible || pausedRef.current;

      if (isAnimationPaused) {
        lastTime = time;
        clearScheduledFrame();
        return;
      }

      if (prefersReducedMotion) {
        lastTime = time;
        scheduleFrame(digitFieldConfig.pausedFrameDelay * 2);
        return;
      }

      const isActivelyInteracting = drawing || pendingPoint || bursts.length || time < activeUntil;
      const frameInterval =
        drawing || pendingPoint
          ? digitFieldConfig.dragFrameInterval
          : isActivelyInteracting
            ? digitFieldConfig.activeFrameInterval
          : digitFieldConfig.idleFrameInterval;

      const timeSincePaint = time - lastPaint;
      if (timeSincePaint < frameInterval) {
        scheduleFrame(frameInterval - timeSincePaint);
        return;
      }

      const delta = Math.min(50, time - lastTime || 33.34);
      lastTime = time;
      lastPaint = time;

      if (drawing && lastPoint && pendingPoint) {
        const point = pendingPoint;
        pendingPoint = null;
        const dx = point.x - lastPoint.x;
        const dy = point.y - lastPoint.y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq > 196 && time - lastManualExplosion > 170) {
          explodeAt(point.x, point.y, {
            radius: randomBetween(64, 130),
            force: randomBetween(3.8, 8.8),
          });
          lastManualExplosion = time;
          markInteraction(time);
        }

        lastPoint = point;
      }

      context.clearRect(0, 0, width, height);
      renderBase();
      drawBursts(delta);
      renderParticles(delta);

      if (time >= nextExplosionAt && particles.length && !drawing && time > activeUntil) {
        explodeAt(
          randomBetween(digitFieldConfig.marginX, Math.max(digitFieldConfig.marginX, width - digitFieldConfig.marginX)),
          randomBetween(digitFieldConfig.marginTop, Math.max(digitFieldConfig.marginTop, height - digitFieldConfig.marginBottom)),
        );
        markInteraction(time);
        nextExplosionAt = time + randomBetween(
          digitFieldConfig.explosionIntervalMin,
          digitFieldConfig.explosionIntervalMax,
        );
      }

      scheduleFrame();
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      pixelRatio = getCanvasPixelRatio(width);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      resetCanvasTransform();
      particleLimit = getParticleLimit(width, height, prefersReducedMotion);

      if (baseContext) {
        baseCanvas.width = canvas.width;
        baseCanvas.height = canvas.height;
        baseContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        baseContext.clearRect(0, 0, width, height);
        drawBase(baseContext);
      }

      particles = makeDigitParticles();
      bursts = [];
      context.clearRect(0, 0, width, height);
      renderBase();
      renderParticles(16);
      nextExplosionAt = performance.now() + randomBetween(
        digitFieldConfig.explosionIntervalMin,
        digitFieldConfig.explosionIntervalMax,
      );
    };

    const queueResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resizeTimer = 0;
        resizeCanvas();
      }, 90);
    };

    const getPoint = (event) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const startDrawing = (event) => {
      if (prefersReducedMotion) return;

      drawing = true;
      lastPoint = getPoint(event);
      explodeAt(lastPoint.x, lastPoint.y, {
        radius: randomBetween(96, 160),
        force: randomBetween(5.6, 12),
      });
      lastManualExplosion = performance.now();
      markInteraction(lastManualExplosion);
      if (event.pointerType !== "touch") {
        canvas.setPointerCapture?.(event.pointerId);
      }
    };

    const drawTrace = (event) => {
      if (!drawing || !lastPoint) return;
      pendingPoint = getPoint(event);
    };

    const stopDrawing = () => {
      drawing = false;
      lastPoint = null;
      pendingPoint = null;
    };

    const handleMotionPreferenceChange = (event) => {
      prefersReducedMotion = event.matches;
      resizeCanvas();
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      lastTime = performance.now();

      if (isPageVisible && canvasVisible && !pausedRef.current) {
        scheduleFrame();
      } else {
        clearScheduledFrame();
      }
    };

    let observer;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          canvasVisible = entry.isIntersecting;
          if (canvasVisible && !pausedRef.current) {
            scheduleFrame();
          } else {
            clearScheduledFrame();
          }
        },
        { threshold: 0.04 },
      );
      observer.observe(canvas);
    }

    pauseAnimationRef.current = () => {
      drawing = false;
      lastPoint = null;
      pendingPoint = null;
      bursts = [];
      clearScheduledFrame();
    };

    resumeAnimationRef.current = () => {
      if (!isPageVisible || !canvasVisible) return;
      lastTime = performance.now();
      scheduleFrame();
    };

    resizeCanvas();
    if (!pausedRef.current) {
      scheduleFrame();
    }
    window.addEventListener("resize", queueResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener("change", handleMotionPreferenceChange);
    } else {
      reducedMotionQuery.addListener?.(handleMotionPreferenceChange);
    }
    canvas.addEventListener("pointerdown", startDrawing, { passive: true });
    canvas.addEventListener("pointermove", drawTrace, { passive: true });
    canvas.addEventListener("pointerup", stopDrawing, { passive: true });
    canvas.addEventListener("pointercancel", stopDrawing, { passive: true });
    canvas.addEventListener("pointerleave", stopDrawing, { passive: true });

    return () => {
      clearScheduledFrame();
      pauseAnimationRef.current = null;
      resumeAnimationRef.current = null;
      window.clearTimeout(resizeTimer);
      observer?.disconnect();
      window.removeEventListener("resize", queueResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener("change", handleMotionPreferenceChange);
      } else {
        reducedMotionQuery.removeListener?.(handleMotionPreferenceChange);
      }
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
        <p className="home-eyebrow">{language === "zh" ? "AI 作品集" : "AI portfolio"}</p>
        <h1>Li Li</h1>
        <p className="home-role">Applied AI | AI Product &amp; Evaluation</p>
        <p className="home-summary">
          Portfolio of research, AI data products, and visual computing projects
        </p>
      </div>

      <ArchiveFlowerMap
        sections={sections}
        language={language}
        onOpenSection={onOpenSection}
        activeSectionId={activeSectionId}
      />
    </section>
  );
}

export default HomeCanvas;
