/* eslint-disable @typescript-eslint/no-explicit-any, no-console */

const COLORS = {
  SUCCESS: 'LimeGreen',
  INFO: 'DodgerBlue',
  WARNING: 'Orange',
  ERROR: 'Red',
};
const FONT_SIZE = '12px';
const FONT_WEIGHT = 'normal';

export const log = Object.freeze({
  success: (msg: string, ...rest: any[]) => {
    'worklet';

    if (process.env.NODE_ENV === 'test') {
      return console.log(msg, ...rest);
    }
    console.log(
      `%c${msg}`,
      `color:${COLORS.SUCCESS};font-size: ${FONT_SIZE}; font-weight: ${FONT_WEIGHT}`,
      ...rest,
    );
  },
  log: (msg: string, ...rest: any[]) => {
    'worklet';

    console.log(msg, ...rest);
  },
  info: (msg: string, ...rest: any[]) => {
    'worklet';

    if (process.env.NODE_ENV === 'test') {
      return console.log(msg, ...rest);
    }
    console.log(
      `%c${msg}`,
      `color:${COLORS.INFO};font-size: ${FONT_SIZE}; font-weight: ${FONT_WEIGHT}`,
      ...rest,
    );
  },
  warning: (msg: string, ...rest: any[]) => {
    'worklet';

    if (process.env.NODE_ENV === 'test') {
      return console.log(msg, ...rest);
    }
    console.log(
      `%c${msg}`,
      `color:${COLORS.WARNING};font-size: ${FONT_SIZE}; font-weight: ${FONT_WEIGHT}`,
      ...rest,
    );
  },
  error: (msg: string, ...rest: any[]) => {
    'worklet';

    if (process.env.NODE_ENV === 'test') {
      return console.log(msg, ...rest);
    }
    console.log(
      `%c${msg}`,
      `color:${COLORS.ERROR};font-size: ${FONT_SIZE}; font-weight: ${FONT_WEIGHT}`,
      ...rest,
    );
  },
});
