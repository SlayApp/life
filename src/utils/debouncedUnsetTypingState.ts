import _ from 'lodash';

import {setIsCharacterTyping} from './setIsCharacterTyping';

const SECONDS_TO_UNSET_TYPING_STATE = 60;

export const debouncedUnsetTypingState = _.debounce((characterId: string) => {
  setIsCharacterTyping(characterId, false);
}, SECONDS_TO_UNSET_TYPING_STATE * 1000);
