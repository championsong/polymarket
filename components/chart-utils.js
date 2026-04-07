export function buildChartPath(points) {
  if (!points.length) return "";

  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const width = 100;
  const height = 100;

  return points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / range) * height;
      return `${index === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");
}
