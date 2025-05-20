// ParticleAtlas.tsx
import {
  Atlas,
  Canvas,
  Rect,
  rect,
  useRSXformBuffer,
  useTexture,
} from '@shopify/react-native-skia';
import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

const NUM_PARTICLES = 300;
const SPAWN_RADIUS = 60;
const FLIGHT_DISTANCE =
  Math.hypot(Dimensions.get('window').width, Dimensions.get('window').height) /
    2 +
  SPAWN_RADIUS;
const FLIGHT_DURATION = 800; // ms
const DOT_SIZE = 6;

// 1️⃣  create the 6 × 6-px cyan dot texture once
const DotTexture = () => {
  return useTexture(
    <Rect rect={rect(0, 0, DOT_SIZE, DOT_SIZE)} color="cyan" />,
    {width: DOT_SIZE, height: DOT_SIZE},
  );
};

export const ParticleAtlas = () => {
  const texture = DotTexture();
  const sprites = new Array(NUM_PARTICLES)
    .fill(0)
    .map(() => rect(0, 0, DOT_SIZE, DOT_SIZE));
  const progress = useSharedValue(0);

  // 2️⃣  advance a single progress value 0→1 on loop
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {duration: FLIGHT_DURATION}),
      -1 /* infinite */,
    );
  }, [progress]);

  // 3️⃣  fill an RSXformBuffer every frame on the UI thread
  const transforms = useRSXformBuffer(NUM_PARTICLES, (m, i) => {
    'worklet';
    // Each particle gets its own seed angle
    const seed = (i / NUM_PARTICLES) * 2 * Math.PI;
    // Spawn point in ring
    const spawnR = Math.sqrt(Math.random()) * SPAWN_RADIUS;
    const spawnX = spawnR * Math.cos(seed);
    const spawnY = spawnR * Math.sin(seed);

    // Travel straight away from centre along the same angle
    const x = spawnX + progress.value * FLIGHT_DISTANCE * Math.cos(seed);
    const y = spawnY + progress.value * FLIGHT_DISTANCE * Math.sin(seed);
    const s = 1 + progress.value * 1.4; // scale 1→2.4
    const c = Math.cos(seed),
      sc = s * c;
    const ss = s * Math.sin(seed);

    //      [ sc  -ss   x ]
    // RSX = [ ss   sc   y ]
    m.set(sc, ss, x, y);
  });

  return (
    <Canvas style={{flex: 1}}>
      <Atlas image={texture} sprites={sprites} transforms={transforms} />
    </Canvas>
  );
};
