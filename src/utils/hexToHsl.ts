import {THSLColor} from '~/types/THslColor';

export const hexToHsl = (hex: string): THSLColor => {
  'worklet';

  if (!/^#([\da-f]{3}|[\da-f]{6})$/i.test(hex)) {
    throw new Error('Invalid hex colour');
  }

  if (hex.length === 4) {
    hex = '#' + [...hex.slice(1)].map(c => c + c).join('');
  }

  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;
  if (delta !== 0) {
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;

    hue *= 60;
    if (hue < 0) hue += 360;
  }

  const luminance = (max + min) / 2;
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * luminance - 1));

  return [hue, saturation, luminance];
};
