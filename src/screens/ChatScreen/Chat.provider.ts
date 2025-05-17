import {useSharedValue} from 'react-native-reanimated';
import {createContainer} from 'unstated-next';

import {HEIGHT_ONE_LINE} from './Chat.constants';

const useContainer = () => {
  const currentNumberOfLines = useSharedValue(1);
  const currentInputHeight = useSharedValue(HEIGHT_ONE_LINE);
  const scrollOffset = useSharedValue(0);

  return {
    currentNumberOfLines,
    currentInputHeight,
    scrollOffset,
  };
};

const Container = createContainer(useContainer);
export const ChatScreenProvider = Container.Provider;
export const useChatScreenContainer = Container.useContainer;
