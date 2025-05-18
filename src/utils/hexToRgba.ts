export function hexToRgba(hex: string, opacity: number) {
  'worklet';

  if (!/^#([\da-f]{3}|[\da-f]{6})$/i.test(hex)) {
    throw new Error('Invalid hex colour');
  }

  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
