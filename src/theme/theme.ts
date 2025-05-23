import {EdgeInsets} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native-unistyles';

import {getHeight, getWidth} from './theme.utils';

export const theme = {
  colors: {
    background: '#FFFFFF',
    primary: '#111111',
    inverted: '#FFFFFF',
    subdued99: '#FCFCFC',
    subdued98: '#F9F9F9',
    subdued97: '#F7F7F7',
    subdued96: '#F5F5F5',
    subdued95: '#F2F2F2',
    subdued94: '#F0F0F0',
    subdued89: '#E2E2E2',
    subdued88: '#E1E1E1',
    subdued86: '#DBDBDB',
    subdued84: '#D7D7D7',
    subdued80: '#CCCCCC',
    subdued60: '#999999',
    subdued40: '#666666',
    accent: '#111111',
  } as const,
  spacing: {
    '1': 1,
    '2': 2,
    '4': 4,
    '8': 8,
    '10': 10,
    '12': 12,
    '16': 16,
    '20': 20,
    '24': 24,
    '28': 28,
    '32': 32,
    '40': 40,
    '48': 48,
    '56': 56,
    '64': 64,
    '72': 72,
    '80': 80,
  } as const,
  fonts: {
    regular: 'OpenRunde-Regular',
    semibold: 'OpenRunde-Semibold',
    bold: 'OpenRunde-Bold',
    medium: 'OpenRunde-Medium',

    variant: {
      tiny: {
        fontSize: 13,
        fontFamily: 'OpenRunde-Regular',
      },
      small: {
        fontSize: 14,
        letterSpacing: -0.1,
        fontFamily: 'OpenRunde-Regular',
      },
      body: {
        fontSize: 16,
        letterSpacing: -0.2,
        fontFamily: 'OpenRunde-Regular',
        lineHeight: 22,
      },
      label: {
        fontSize: 17,
        letterSpacing: -0.2,
        fontFamily: 'OpenRunde-Semibold',
        lineHeight: 22,
      },
      title: {
        fontSize: 18,
        letterSpacing: -0.2,
        fontFamily: 'OpenRunde-Bold',
      },
      h2: {
        fontSize: 21,
        letterSpacing: -0.5,
        fontFamily: 'OpenRunde-Bold',
      },
      h3: {
        fontSize: 20,
        letterSpacing: -0.5,
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
  } as const,
  screen: {
    width: getWidth(),
    height: getHeight(),
  } as const,
  layout: {
    onboardingScreenMarginHorizontal: 32,
    screenMarginHorizontal: 20,
    headerHeight: 48,
    buttonHeight: 52,
    buttonKeyboardOffset: 16,
  } as const,
  insets: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  } as EdgeInsets,
  shadows: {
    whiteOnWhite: [
      {
        offsetX: 0,
        offsetY: 8,
        blurRadius: 48,
        color: 'rgba(238,238,238,1)',
      },
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 8,
        color: 'rgba(66,71,76,0.06)',
      },
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 1.5,
        color: 'rgba(66,71,76,0.32)',
      },
      {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 1,
        inset: true,
        color: 'rgba(255,255,255,1)',
      },
    ] as const,
  },
} as const;

StyleSheet.configure({themes: {main: theme}});
