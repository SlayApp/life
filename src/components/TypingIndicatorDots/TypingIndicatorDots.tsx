import {TypingIndicatorDot} from './components';
import {INDICATORS} from './TypingIndicatorDots.constants';
import {useTypingIndicatorDots} from './TypingIndicatorDots.hook';

export const TypingIndicatorDots: React.FC = () => {
  const {selected} = useTypingIndicatorDots();

  return INDICATORS.map((_, index) => (
    <TypingIndicatorDot key={index} selected={selected} index={index} />
  ));
};
