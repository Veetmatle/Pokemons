export const getTypeGradientColors = (
  types: string[],
): [string, string, string] => {
  const primaryType = types[0]?.toLowerCase() || 'normal';

  const gradientColors: Record<string, [string, string, string]> = {
    fire: ['#fb923c', '#f97316', '#dc2626'],
    water: ['#93c5fd', '#60a5fa', '#4f46e5'],
    grass: ['#86efac', '#4ade80', '#059669'],
    electric: ['#fde047', '#facc15', '#f59e0b'],
    psychic: ['#f9a8d4', '#f472b6', '#9333ea'],
    ice: ['#a5f3fc', '#67e8f9', '#3b82f6'],
    dragon: ['#818cf8', '#4f46e5', '#5b21b6'],
    dark: ['#4b5563', '#374151', '#0f172a'],
    fairy: ['#fbcfe8', '#f9a8d4', '#fb7185'],
    normal: ['#e5e7eb', '#d1d5db', '#94a3b8'],
  };

  return gradientColors[primaryType] || gradientColors.normal;
};

export const getTypeAccentColor = (types: string[]): string =>
  getTypeGradientColors(types)[1];

export const hexToRgba = (hex: string, alpha: number): string => {
  const parsed = hex.replace('#', '');
  const r = parseInt(parsed.substring(0, 2), 16);
  const g = parseInt(parsed.substring(2, 4), 16);
  const b = parseInt(parsed.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
