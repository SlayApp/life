import {View} from 'react-native';

import {Text} from '~/components/Text';

import {useLoadingScreen} from './Loading.hooks';
import {styles} from './Loading.styles';

export const LoadingScreen: React.FC = () => {
  useLoadingScreen();

  return (
    <View style={styles.container}>
      <Text variant="headline">Creating</Text>
      <Text variant="headline">the World</Text>
    </View>
  );
};
