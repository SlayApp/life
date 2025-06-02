import {create} from 'zustand';

type TypingStore = {
  flags: Record<string, boolean>;
  setIsTyping: (id: string, value: boolean) => void;
  getIsTyping: (id: string) => boolean;
};

export const useIsTypingStore = create<TypingStore>((set, get) => ({
  flags: {},

  setIsTyping: (id, value) =>
    set(state => ({
      flags: {...state.flags, [id]: value},
    })),

  getIsTyping: (id: string) => {
    const {flags} = get();

    return flags[id] ?? false;
  },
}));

export const setIsCharacterTyping = (
  characterId: string,
  isTyping: boolean,
) => {
  useIsTypingStore.setState(s => ({
    flags: {...s.flags, [characterId]: isTyping},
  }));
};
