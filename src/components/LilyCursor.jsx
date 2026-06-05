import { useEffect, useRef, useState } from "react";

const pollenColors = [
  "rgba(236, 198, 124, 0.34)",
  "rgba(144, 172, 142, 0.28)",
  "rgba(246, 242, 233, 0.42)",
  "rgba(214, 140, 120, 0.2)",
  "rgba(143, 170, 184, 0.22)",
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function LilyCursor() {
  const [position, setPosition] = useState({ x: -80, y: -80 });
  const [isBlooming, setIsBlooming] = useState(false);
  const [particles, setParticles] = useState([]);
  const lastPointRef = useRef(null);
  const lastEmitRef = useRef(0);

  useEffect(() => {
    const addParticles = (event, isClick = false) => {
      const now = Date.now();
      const lastPoint = lastPointRef.current;
      const distance = lastPoint
        ? Math.hypot(event.clientX - lastPoint.x, event.clientY - lastPoint.y)
        : 0;
      const count = isClick
        ? 18
        : Math.min(7, Math.max(2, Math.round(distance / 18)));

      const newParticles = Array.from({ length: count }, (_, index) => ({
        id: `${now}-${index}-${Math.random()}`,
        x: event.clientX + randomBetween(-10, 10),
        y: event.clientY + randomBetween(-10, 10),
        size: isClick ? randomBetween(8, 18) : randomBetween(3, 9),
        color: pollenColors[Math.floor(Math.random() * pollenColors.length)],
        driftX: randomBetween(-22, 22),
        driftY: randomBetween(-34, 8),
        rotate: randomBetween(-28, 28),
        duration: isClick ? randomBetween(2400, 3600) : randomBetween(8000, 15000),
        type: isClick && index < 5 ? "petal" : "dust",
        createdAt: now,
      }));

      setParticles((current) => [...current.slice(-120), ...newParticles]);
    };

    const handleMove = (event) => {
      const now = Date.now();
      setPosition({ x: event.clientX, y: event.clientY });

      if (now - lastEmitRef.current > 34) {
        addParticles(event);
        lastEmitRef.current = now;
      }

      lastPointRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleDown = (event) => {
      setIsBlooming(true);
      addParticles(event, true);
      window.setTimeout(() => setIsBlooming(false), 520);
    };

    const prune = window.setInterval(() => {
      const now = Date.now();
      setParticles((current) =>
        current.filter((particle) => now - particle.createdAt < particle.duration),
      );
    }, 1200);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handleDown);

    return () => {
      window.clearInterval(prune);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
    };
  }, []);

  return (
    <>
      <div
        className={`lily-cursor ${isBlooming ? "is-blooming" : ""}`}
        style={{
          "--cursor-x": `${position.x}px`,
          "--cursor-y": `${position.y}px`,
        }}
        aria-hidden="true"
      >
        <svg viewBox="-20 -22 48 52" role="presentation">
          <path className="lily-petal petal-left" d="M4 10C-7 0-9-12-3-20C6-10 9-1 4 10Z" />
          <path className="lily-petal petal-center" d="M4 10C1-5 6-17 16-21C18-8 14 3 4 10Z" />
          <path className="lily-petal petal-right" d="M4 10C10-3 20-9 28-6C21 4 14 10 4 10Z" />
          <path className="lily-stem" d="M4 10C1 18-2 25-9 31" />
          <path className="lily-line" d="M4 10C8 4 9-4 10-13" />
          <circle className="lily-pollen-dot" cx="4" cy="9" r="1.6" />
        </svg>
      </div>

      <div className="pollen-layer" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className={`pollen-particle pollen-${particle.type}`}
            style={{
              "--pollen-x": `${particle.x}px`,
              "--pollen-y": `${particle.y}px`,
              "--pollen-size": `${particle.size}px`,
              "--pollen-color": particle.color,
              "--pollen-drift-x": `${particle.driftX}px`,
              "--pollen-drift-y": `${particle.driftY}px`,
              "--pollen-rotate": `${particle.rotate}deg`,
              "--pollen-duration": `${particle.duration}ms`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export default LilyCursor;
