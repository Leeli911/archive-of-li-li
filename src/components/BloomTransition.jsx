const bloomColors = [
  "#D68C78",
  "#90AC8E",
  "#8FAAB8",
  "#ECC67C",
  "#F6F2E9",
  "#D68C78",
  "#90AC8E",
];

function BloomTransition({ bloom }) {
  if (!bloom) return null;

  return (
    <div
      className="bloom-transition"
      style={{
        "--bloom-x": `${bloom.x}px`,
        "--bloom-y": `${bloom.y}px`,
      }}
      aria-hidden="true"
    >
      {bloomColors.map((color, index) => (
        <span
          key={`${color}-${index}`}
          style={{
            "--petal-color": color,
            "--petal-angle": `${index * 52 + bloom.seed * 9}deg`,
            "--petal-delay": `${index * 42}ms`,
          }}
        />
      ))}
      <p>
        Opening {bloom.label}
        <small>{bloom.detail}</small>
      </p>
    </div>
  );
}

export default BloomTransition;
