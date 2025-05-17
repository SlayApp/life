import {BlurView} from 'expo-blur';
import {TextInput} from 'react-native';
import Animated from 'react-native-reanimated';

export const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
export const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
