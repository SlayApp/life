import {View} from 'react-native';

import {Text} from '~/components/Text';

import {ParticleAtlas} from './components/ParticleView';
import {styles} from './Landing.styles';

export const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ParticleAtlas />
      <Text variant="headline">Creating</Text>
      <Text variant="headline">the World</Text>
    </View>
  );
};
