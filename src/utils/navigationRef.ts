import {createNavigationContainerRef} from '@react-navigation/native';

import {TRootStackParamList} from '~/navigation/RootStack';

export const navigationRef =
  createNavigationContainerRef<TRootStackParamList>();
