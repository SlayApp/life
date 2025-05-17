import {StyleSheet} from 'react-native-unistyles';

export const typographyStyles = StyleSheet.create({
  text: {
    fontFamily: 'OpenRunde-Regular',
    color: '#000',
    fontSize: 16,
    letterSpacing: -0.2,

    variants: {
      variant: {
        body: {
          fontSize: 16,
          letterSpacing: -0.2,
          fontFamily: 'OpenRunde-Regular',
        },
        title: {
          fontSize: 18,
          letterSpacing: -0.2,
          fontFamily: 'OpenRunde-Bold',
        },
        headline: {
          fontSize: 24,
          letterSpacing: -0.5,
          fontFamily: 'OpenRunde-Bold',
        },
      },

      weight: {
        regular: {fontFamily: 'OpenRunde-Regular'},
        medium: {fontFamily: 'OpenRunde-Medium'},
        bold: {fontFamily: 'OpenRunde-Bold'},
        semibold: {fontFamily: 'OpenRunde-Semibold'},
      },

      color: {
        primary: {color: '#000'},
        secondary: {color: '#000'},
        link: {color: '#000'},
        inverted: {color: '#fff'},
      },
    },
  },
});
