const { PI, sin, cos, log2 } = Math;

export function bion(n) {
  const x = log2(n) * cos(2 * PI * log2(n));
  const y = log2(n) * sin(2 * PI * log2(n));

  return { x, y };
}
