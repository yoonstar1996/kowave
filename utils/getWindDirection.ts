export function getWindDirection(deg: number): string {
  if (deg >= 337.5 || deg < 22.5) return "북풍";
  if (deg >= 22.5 && deg < 67.5) return "북동풍";
  if (deg >= 67.5 && deg < 112.5) return "동풍";
  if (deg >= 112.5 && deg < 157.5) return "남동풍";
  if (deg >= 157.5 && deg < 202.5) return "남풍";
  if (deg >= 202.5 && deg < 247.5) return "남서풍";
  if (deg >= 247.5 && deg < 292.5) return "서풍";
  if (deg >= 292.5 && deg < 337.5) return "북서풍";
  return "알 수 없음";
}
