import { useEffect, useRef } from "react";

const pollenColors = [
  "rgba(236, 198, 124, 0.34)",
  "rgba(144, 172, 142, 0.28)",
  "rgba(246, 242, 233, 0.42)",
  "rgba(214, 140, 120, 0.22)",
  "rgba(143, 170, 184, 0.24)",
];

const clickableSelector = [
  "a",
  "button",
  "[role='button']",
  "input",
  "select",
  "textarea",
  "summary",
  ".nav-item",
  ".flower-node",
  ".archive-branch",
  ".clickable",
].join(",");

const maxPollen = 12;
const reducedPollenLimit = 5;
const cursorOffset = "translate(-50%, -42%) rotate(-10deg)";
const trailDistanceSq = 32 * 32;
const reducedTrailDistanceSq = 56 * 56;
const trailIntervalMs = 160;
const reducedTrailIntervalMs = 420;
const scrollPollenPauseMs = 220;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function LilyCursor({ waiting = false, reducedEffects = false }) {
  const cursorRef = useRef(null);
  const pollenLayerRef = useRef(null);
  const timeoutsRef = useRef([]);
  const reducedEffectsRef = useRef(reducedEffects);

  useEffect(() => {
    cursorRef.current?.classList.toggle("waiting", waiting);
  }, [waiting]);

  useEffect(() => {
    reducedEffectsRef.current = reducedEffects;
  }, [reducedEffects]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const pollenLayer = pollenLayerRef.current;
    if (!cursor || !pollenLayer) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let pollenCount = 0;
    let lastTrailX = -80;
    let lastTrailY = -80;
    let lastTrailAt = 0;
    let pointerX = -80;
    let pointerY = -80;
    let moveFrame = 0;
    let isPageVisible = !document.hidden;
    let isScrolling = false;
    let scrollTimer = 0;

    if (!hoverCapable) return undefined;

    document.documentElement.classList.add("custom-cursor");
    document.body.classList.add("custom-cursor");

    const moveCursor = (x, y) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) ${cursorOffset}`;
    };

    const requestCursorMove = () => {
      if (moveFrame) return;

      moveFrame = window.requestAnimationFrame(() => {
        moveFrame = 0;
        moveCursor(pointerX, pointerY);
      });
    };

    const clearTimer = (timer) => {
      timeoutsRef.current = timeoutsRef.current.filter((item) => item !== timer);
    };

    const addPollen = (x, y, burst = false) => {
      const isReducedEffects = reducedEffectsRef.current;
      const pollenLimit = isReducedEffects ? reducedPollenLimit : maxPollen;
      if (reducedMotion || !isPageVisible || isScrolling || pollenCount >= pollenLimit) return;

      const burstCount = isReducedEffects ? 2 : 4;
      const count = Math.min(burst ? burstCount : 1, pollenLimit - pollenCount);
      for (let index = 0; index < count; index += 1) {
        const particle = document.createElement("span");
        const size = burst ? randomBetween(4, 9) : randomBetween(2.5, 5.5);

        particle.className = `pollen-particle ${burst && index < 3 ? "pollen-petal" : "pollen-dust"}`;
        particle.style.setProperty("--pollen-x", `${x + randomBetween(-7, 7)}px`);
        particle.style.setProperty("--pollen-y", `${y + randomBetween(-7, 7)}px`);
        particle.style.setProperty("--pollen-size", `${size}px`);
        particle.style.setProperty(
          "--pollen-color",
          pollenColors[Math.floor(Math.random() * pollenColors.length)],
        );
        particle.style.setProperty("--pollen-drift-x", `${randomBetween(-18, 18)}px`);
        particle.style.setProperty("--pollen-drift-y", `${randomBetween(-26, 10)}px`);
        particle.style.setProperty("--pollen-rotate", `${randomBetween(-34, 34)}deg`);
        particle.style.setProperty("--pollen-duration", `${burst ? randomBetween(500, 700) : randomBetween(760, 1160)}ms`);

        pollenCount += 1;
        pollenLayer.appendChild(particle);

        particle.addEventListener(
          "animationend",
          () => {
            pollenCount = Math.max(0, pollenCount - 1);
            particle.remove();
          },
          { once: true },
        );
      }
    };

    const handleMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      requestCursorMove();

      const now = performance.now();
      const dx = event.clientX - lastTrailX;
      const dy = event.clientY - lastTrailY;
      const distanceSq = dx * dx + dy * dy;
      const activeTrailDistanceSq = reducedEffectsRef.current ? reducedTrailDistanceSq : trailDistanceSq;
      const activeTrailIntervalMs = reducedEffectsRef.current ? reducedTrailIntervalMs : trailIntervalMs;

      if (distanceSq > activeTrailDistanceSq && now - lastTrailAt > activeTrailIntervalMs) {
        addPollen(event.clientX, event.clientY);
        lastTrailX = event.clientX;
        lastTrailY = event.clientY;
        lastTrailAt = now;
      }
    };

    const handlePointerDown = () => {
      cursor.classList.add("active");
    };

    const handlePointerUp = () => {
      cursor.classList.remove("active");
    };

    const handleDoubleClick = (event) => {
      cursor.classList.add("double-click");
      addPollen(event.clientX, event.clientY, true);

      const timer = window.setTimeout(() => {
        cursor.classList.remove("double-click");
        clearTimer(timer);
      }, 460);
      timeoutsRef.current.push(timer);
    };

    const handlePointerOver = (event) => {
      const target = event.target;
      const isClickable = target instanceof Element && target.closest(clickableSelector);
      cursor.classList.toggle("hover-link", Boolean(isClickable));
    };

    const handleScroll = () => {
      isScrolling = true;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        isScrolling = false;
        scrollTimer = 0;
      }, scrollPollenPauseMs);
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;

      if (!isPageVisible) {
        isScrolling = false;
        pollenCount = 0;
        pollenLayer.replaceChildren();
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("dblclick", handleDoubleClick, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("dblclick", handleDoubleClick);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.cancelAnimationFrame(moveFrame);
      window.clearTimeout(scrollTimer);
      timeoutsRef.current.forEach((timer) => window.clearTimeout(timer));
      timeoutsRef.current = [];
      pollenLayer.replaceChildren();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="flower-cursor lily-cursor"
        aria-hidden="true"
      >
        <svg viewBox="-24 -25 58 58" role="presentation">
          <g className="cursor-bloom">
            <ellipse className="cursor-petal petal-left" cx="-3" cy="-6" rx="7" ry="17" transform="rotate(-36 -3 -6)" />
            <ellipse className="cursor-petal petal-center" cx="4" cy="-9" rx="7.5" ry="18" transform="rotate(4 4 -9)" />
            <ellipse className="cursor-petal petal-right" cx="12" cy="-5" rx="6.6" ry="16" transform="rotate(38 12 -5)" />
            <ellipse className="cursor-petal petal-low-left" cx="1" cy="4" rx="6.8" ry="14" transform="rotate(-72 1 4)" />
            <ellipse className="cursor-petal petal-low-right" cx="9" cy="4" rx="6.8" ry="14" transform="rotate(72 9 4)" />
            <circle className="cursor-core" cx="5" cy="0" r="3.1" />
          </g>
          <path className="lily-stem" d="M5 4C2 13-3 22-12 31" />
          <path className="lily-line" d="M5 2C8-4 8-10 8-17" />
        </svg>
      </div>

      <div ref={pollenLayerRef} className="pollen-layer" aria-hidden="true" />
    </>
  );
}

export default LilyCursor;
