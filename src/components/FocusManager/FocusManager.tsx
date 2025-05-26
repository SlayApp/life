import {focusManager} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';

const onAppStateChange = (status: AppStateStatus) => {
  focusManager.setFocused(status === 'active');
};

export const FocusManager: React.FC = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  return null;
};
