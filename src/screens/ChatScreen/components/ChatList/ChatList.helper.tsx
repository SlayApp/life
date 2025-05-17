import {CellContainer, FlashList} from '@shopify/flash-list';
import {MessageResponseDto} from 'api-client/api';
import {Component, forwardRef, Ref} from 'react';
import {FlatList, View} from 'react-native';
import {useReanimatedKeyboardAnimation} from 'react-native-keyboard-controller';
import Animated, {
  EntryAnimationsValues,
  LayoutAnimationFunction,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {spring} from '~/motion/spring';
import {
  CHAT_HEADER_HEIGHT,
  LIST_INPUT_VERTICAL_PADDING,
} from '~/screens/ChatScreen/Chat.constants';
import {useChatScreenContainer} from '~/screens/ChatScreen/Chat.provider';

import {styles} from './ChatList.styles';

export const AnimatedFlashList = Animated.createAnimatedComponent(
  FlashList<MessageResponseDto>,
);

export const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<MessageResponseDto>,
);

export const keyExtractor = (item: MessageResponseDto) => item.id.toString();

export const ListFooterComponent: React.FC = () => {
  const {currentInputHeight} = useChatScreenContainer();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: currentInputHeight.value + LIST_INPUT_VERTICAL_PADDING,
    };
  }, [currentInputHeight]);

  return <Animated.View style={animatedStyle} />;
};

export const ListHeaderComponent: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {height} = useReanimatedKeyboardAnimation();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingTop: insets.top + CHAT_HEADER_HEIGHT - height.value,
    };
  }, [height, insets.top]);

  return <Animated.View style={animatedStyle} />;
};

export const ItemSeparatorComponent: React.FC = () => {
  return <View style={styles.listSeperatorComponent} />;
};

// For LayoutAnimation with FlashList, we need to wrap the CellContainer with Animated.createAnimatedComponent
const AnimatedCellContainer = Animated.createAnimatedComponent(CellContainer);

export const CustomLayoutAnimation: LayoutAnimationFunction = values => {
  'worklet';

  // Calculate delta (we want to know of the element was recycled outside the viewport)
  const delta = Math.abs(values.targetOriginY - values.currentOriginY);

  // Determine if the element should animate based on the delta
  const shouldAnimate = !(delta > values.windowHeight);

  return {
    initialValues: {
      originX: values.currentOriginX,
      originY: values.currentOriginY,
      width: values.currentWidth,
      height: values.currentHeight,
    },
    animations: {
      originX: values.targetOriginX,
      originY: shouldAnimate
        ? spring(values.targetOriginY, {dampingFraction: 0.9, response: 0.25})
        : values.targetOriginY,
      width: values.targetWidth,
      height: values.targetHeight,
    },
  };
};

export const EnteringAnimation = (values: EntryAnimationsValues) => {
  'worklet';

  return {
    initialValues: {
      originY: values.targetOriginY - values.targetHeight,
      opacity: 0,
    },
    animations: {
      opacity: spring(1, {dampingFraction: 1, response: 1}),
      originY: spring(values.targetOriginY, {
        dampingFraction: 0.9,
        response: 0.25,
      }),
    },
  };
};

export const CustomCellRenderer = forwardRef(
  (
    props: {index: number; style: {[key: string]: object}},
    ref: Ref<Component<unknown>>,
  ) => {
    return (
      <AnimatedCellContainer
        {...props}
        ref={ref}
        // entering={EnteringAnimation}
      />
    );
  },
);
