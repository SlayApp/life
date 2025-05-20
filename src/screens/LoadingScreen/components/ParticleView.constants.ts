import {Dimensions} from 'react-native';

export const NUM_PARTICLES = 100 as const;
export const PARTICLE_SIZE = 4 as const;
export const SPAWN_RADIUS = 60 as const;
export const DURATION_RANGE = [1200, 1800] as const;
export const SCALE_RANGE = [0.2, 4] as const;
export const PARTICLE_COLOR = 'rgba(0,0,0,0.8)' as const;
export const SPAWN_INTERVAL_MS = 20 as const;
export const FADE_IN_FRAC = 0.2 as const;

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');
export const HALF_DIAGONAL = Math.hypot(SCREEN_WIDTH, SCREEN_HEIGHT) / 2;

export const randomBetween = (min: number, max: number): number => {
  'worklet';

  return Math.random() * (max - min) + min;
};
