import {View} from 'react-native';

import {TFCWithChildren} from '~/types/TFCWithChildren';

import {Text} from '../Text';
import {styles} from './FluidOnboardingTemplate.styles';

interface IProps {
  title: string;
  subtitle: string;
}

export const FluidOnboardingTemplate: TFCWithChildren<IProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <View style={styles.flex1}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text align="center" variant="h2" weight="bold">
            {title}
          </Text>
          <Text align="center" variant="body" weight="medium" color="secondary">
            {subtitle}
          </Text>
        </View>
        {children}
      </View>
    </View>
  );
};
