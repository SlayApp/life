import {View} from 'react-native';

import {Button} from '~/components/Button/Button';
import {SafeAreaWrapper} from '~/components/SafeAreaWrapper';
import {Text} from '~/components/Text';

import {useLandingScreen} from './Landing.hook';
import {styles} from './Landing.styles';

export const LandingScreen: React.FC = () => {
  const {onPress} = useLandingScreen();

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.flex1}>
        <Text align="center" variant="headline">
          Your new bestie
        </Text>
        <Text align="center" color="secondary" variant="body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} label="Get Started" />
      </View>
    </SafeAreaWrapper>
  );
};
