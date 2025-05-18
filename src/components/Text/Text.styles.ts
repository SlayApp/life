import {StyleSheet} from 'react-native-unistyles';

export const typographyStyles = StyleSheet.create(theme => ({
  text: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.primary,
    fontSize: 16,
    letterSpacing: -0.2,

    variants: {
      variant: theme.fonts.variant,

      weight: {
        regular: {fontFamily: theme.fonts.regular},
        medium: {fontFamily: theme.fonts.medium},
        bold: {fontFamily: theme.fonts.bold},
        semibold: {fontFamily: theme.fonts.semibold},
      },

      color: {
        primary: {color: theme.colors.primary},
        secondary: {color: theme.colors.subdued60},
        inverted: {color: theme.colors.inverted},
      },
    },
  },
}));
