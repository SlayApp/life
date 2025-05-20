import React, {memo, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  DURATION_RANGE,
  FADE_IN_FRAC,
  HALF_DIAGONAL,
  NUM_PARTICLES,
  PARTICLE_SIZE,
  randomBetween,
  SCALE_RANGE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SPAWN_INTERVAL_MS,
} from './ParticleView.constants';
import {styles} from './ParticleView.styles';

interface ParticleProps {
  centreX: number;
  centreY: number;
}

const Particle: React.FC<ParticleProps> = memo(({centreX, centreY}) => {
  const angle = randomBetween(0, 2 * Math.PI);
  const distance = HALF_DIAGONAL + 40;
  const initialTheta = randomBetween(0, 2 * Math.PI);
  const initX = Math.cos(initialTheta);
  const initY = Math.sin(initialTheta);
  const scaleTarget = randomBetween(...SCALE_RANGE);
  const duration = randomBetween(...DURATION_RANGE);

  const progress = useSharedValue<number>(0);

  const baseX = centreX - PARTICLE_SIZE / 2 + initX;
  const baseY = centreY - PARTICLE_SIZE / 2 + initY;

  useEffect(() => {
    progress.value = withTiming(1, {duration});
  }, [duration, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const tx = baseX + progress.value * distance * Math.cos(angle);
    const ty = baseY + progress.value * distance * Math.sin(angle);
    const scale = 1 + progress.value * (scaleTarget - 1);

    const opacityIn = progress.value / FADE_IN_FRAC;
    const opacityOut = 1 - (progress.value - FADE_IN_FRAC) / (1 - FADE_IN_FRAC);
    const opacity = progress.value < FADE_IN_FRAC ? opacityIn : opacityOut;

    return {
      transform: [{translateX: tx}, {translateY: ty}, {scale}],
      opacity: Math.max(0, Math.min(1, opacity)),
    };
  });

  return <Animated.View style={[styles.particle, animatedStyle]} />;
});

export const ParticleView: React.FC = () => {
  const centreX = SCREEN_WIDTH / 2;
  const centreY = SCREEN_HEIGHT / 2;

  const nextId = useRef<number>(0);
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    const spawnLoop = setInterval(() => {
      setParticles(current => {
        if (current.length >= NUM_PARTICLES) return current;
        const id = nextId.current++;

        setTimeout(() => {
          setParticles(p => p.filter(pid => pid !== id));
        }, DURATION_RANGE[1]);

        return [...current, id];
      });
    }, SPAWN_INTERVAL_MS);

    return () => clearInterval(spawnLoop);
  }, []);

  return (
    <Animated.View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map(id => (
        <Particle key={id} centreX={centreX} centreY={centreY} />
      ))}
    </Animated.View>
  );
};
