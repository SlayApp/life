/* eslint-disable @typescript-eslint/no-require-imports */
import {useFonts} from 'expo-font';
import React, {ReactNode, useEffect} from 'react';
import {View} from 'react-native';
import BootSplash from 'react-native-bootsplash';

interface Props {
  children: ReactNode;
}

export function RessourceLoader({children}: Props) {
  const [loaded, error] = useFonts({
    'SF-Pro-Rounded-Black': require('../../../assets/fonts/SF-Pro-Rounded-Black.otf'),
    'SF-Pro-Rounded-Bold': require('../../../assets/fonts/SF-Pro-Rounded-Bold.otf'),
    'SF-Pro-Rounded-Heavy': require('../../../assets/fonts/SF-Pro-Rounded-Heavy.otf'),
    'SF-Pro-Rounded-Light': require('../../../assets/fonts/SF-Pro-Rounded-Light.otf'),
    'SF-Pro-Rounded-Medium': require('../../../assets/fonts/SF-Pro-Rounded-Medium.otf'),
    'SF-Pro-Rounded-Regular': require('../../../assets/fonts/SF-Pro-Rounded-Regular.otf'),
    'SF-Pro-Rounded-Semibold': require('../../../assets/fonts/SF-Pro-Rounded-Semibold.otf'),
    'SF-Pro-Rounded-Thin': require('../../../assets/fonts/SF-Pro-Rounded-Thin.otf'),
    'SF-Pro-Rounded-UltraLight': require('../../../assets/fonts/SF-Pro-Rounded-Ultralight.otf'),
    'OpenRunde-Bold': require('../../../assets/fonts/OpenRunde-Bold.otf'),
    'OpenRunde-Medium': require('../../../assets/fonts/OpenRunde-Medium.otf'),
    'OpenRunde-Regular': require('../../../assets/fonts/OpenRunde-Regular.otf'),
    'OpenRunde-Semibold': require('../../../assets/fonts/OpenRunde-Semibold.otf'),
  });

  useEffect(() => {
    BootSplash.isVisible().then(console.log);
    if (loaded || error) {
      BootSplash.hide({fade: true});
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <View style={{flex: 1}}>{children}</View>;
}
