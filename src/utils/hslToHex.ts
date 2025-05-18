import {THSLColor} from '~/types/THslColor';

export function hslToHex([hue, saturation, luminance]: THSLColor): string {
  'worklet';

  hue = ((hue % 360) + 360) % 360;

  const c = (1 - Math.abs(2 * luminance - 1)) * saturation;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = luminance - c / 2;

  let r = 0,
    g = 0,
    b = 0;
  if (hue < 60) [r, g, b] = [c, x, 0];
  else if (hue < 120) [r, g, b] = [x, c, 0];
  else if (hue < 180) [r, g, b] = [0, c, x];
  else if (hue < 240) [r, g, b] = [0, x, c];
  else if (hue < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (val: number) =>
    Math.round((val + m) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
