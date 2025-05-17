import {View} from 'react-native';

import {Button} from '~/components/Button/Button';
import {SafeAreaWrapper} from '~/components/SafeAreaWrapper';

import {useLandingScreen} from './Landing.hook';
import {styles} from './Landing.styles';

export const LandingScreen: React.FC = () => {
  const {onPress} = useLandingScreen();

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.flex1} />
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} label="Next" />
      </View>
    </SafeAreaWrapper>
  );
};
