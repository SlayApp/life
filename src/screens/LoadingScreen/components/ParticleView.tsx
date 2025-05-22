import {
  Atlas,
  Canvas,
  Circle,
  rect,
  Skia,
  useColorBuffer,
  useRSXformBuffer,
  useTexture,
} from '@shopify/react-native-skia';
import React, {useEffect, useMemo} from 'react';
import {Dimensions} from 'react-native';
import {useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

/* ──────────────  CONFIG  ─────────────── */
const NUM_PARTICLES = 200;
const DOT_SIZE = 6; // px  (diameter)
const FLIGHT_DURATION = 900; // ms  (centre → off-screen)
const FADE_IN_FRAC = 0.15; // first 15 % of flight
const SCALE_MIN_MAX = [0.8, 2.4] as const;

const {width: W, height: H} = Dimensions.get('window');
const HALF_DIAGONAL = Math.hypot(W, H) / 2 + 40;

const useDotTexture = () =>
  useTexture(
    <Circle cx={DOT_SIZE / 2} cy={DOT_SIZE / 2} r={DOT_SIZE} color="white" />,
    {width: DOT_SIZE, height: DOT_SIZE},
  );

const rand = (min: number, max: number) => {
  'worklet';

  return Math.random() * (max - min) + min;
};

export const WarpStars = () => {
  const texture = useDotTexture();

  const sprites = useMemo(
    () =>
      Array.from({length: NUM_PARTICLES}, () => rect(0, 0, DOT_SIZE, DOT_SIZE)),
    [],
  );

  const colors = useMemo(() => {
    return Array.from({length: NUM_PARTICLES}, () =>
      Skia.Color(`rgba(0, 0, 0, ${rand(0, 1)})`),
    );
  }, []);

  const test = useColorBuffer(NUM_PARTICLES, (c, i) => {
    'worklet';

    c.set(Skia.Color(`rgba(0, 0, 0, ${rand(0, 1)})`));
  });

  const angles = useMemo(
    () => sprites.map(() => rand(0, 2 * Math.PI)),
    [sprites],
  );
  const phaseOffsets = useMemo(
    () => sprites.map(() => Math.random()),
    [sprites],
  );
  const scaleTargets = useMemo(
    () => sprites.map(() => rand(...SCALE_MIN_MAX)),
    [sprites],
  );

  const tGlobal = useSharedValue(0);
  useEffect(() => {
    tGlobal.value = withRepeat(
      withTiming(1, {duration: FLIGHT_DURATION}),
      -1,
      false,
    );
  }, [tGlobal]);

  const transforms = useRSXformBuffer(NUM_PARTICLES, (m, i) => {
    'worklet';
    const angle = angles[i];
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const t = (tGlobal.value + phaseOffsets[i]) % 1; // 0‥1 for this sprite

    const x = t * HALF_DIAGONAL * cosA + W / 2 - DOT_SIZE / 2;
    const y = t * HALF_DIAGONAL * sinA + H / 2 - DOT_SIZE / 2;

    const s = 1 + t * (scaleTargets[i] - 1); // grow as it flies out

    m.set(s * cosA, s * sinA, x, y);
  });

  /* ── RENDER ───────────────────────────── */
  return (
    <Canvas style={{flex: 1}}>
      <Atlas
        image={texture}
        sprites={sprites}
        transforms={transforms}
        colors={colors}

        // blendMode="srcOver" // default, but explicit is nice
        // sampling={{filter: FilterMode.Nearest}}
      />
    </Canvas>
  );
};
