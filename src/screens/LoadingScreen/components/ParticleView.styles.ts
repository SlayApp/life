import {StyleSheet} from 'react-native-unistyles';

import {PARTICLE_COLOR, PARTICLE_SIZE} from './ParticleView.constants';

export const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    width: PARTICLE_SIZE,
    height: PARTICLE_SIZE,
    borderRadius: PARTICLE_SIZE / 2,
    backgroundColor: PARTICLE_COLOR,
  },
});
