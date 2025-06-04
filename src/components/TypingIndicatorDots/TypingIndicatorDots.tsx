import {memo} from 'react';

import {TypingIndicatorDot} from './components';
import {INDICATORS} from './TypingIndicatorDots.constants';
import {useTypingIndicatorDots} from './TypingIndicatorDots.hook';

interface IProps {
  size?: number;
}

export const TypingIndicatorDots: React.FC<IProps> = memo(({size}) => {
  const {selected} = useTypingIndicatorDots();

  return INDICATORS.map((_, index) => (
    <TypingIndicatorDot
      size={size}
      key={index}
      selected={selected}
      index={index}
    />
  ));
});
