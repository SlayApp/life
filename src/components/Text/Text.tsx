import {memo} from 'react';
import {StyleProp, Text as RNText, TextProps, TextStyle} from 'react-native';
import {UnistylesVariants} from 'react-native-unistyles';

import {typographyStyles} from './Text.styles';

type VariantProps = UnistylesVariants<typeof typographyStyles>;
type Props = VariantProps & {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  align?: TextStyle['textAlign'];
} & Omit<TextProps, 'style'>;

export const Text: React.FC<Props> = memo(
  ({variant, weight, color, style, children, align, ...rest}) => {
    typographyStyles.useVariants({variant, weight, color});

    return (
      <RNText
        style={[typographyStyles.text, style, {textAlign: align}]}
        {...rest}>
        {children}
      </RNText>
    );
  },
);
