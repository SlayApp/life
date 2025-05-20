import {useCallback, useRef} from 'react';
import {createContainer} from 'unstated-next';

import {EUserGender} from '~/enums/EUserGender';
import {TInterest} from '~/screens/SelectInterestsScreen/SelectInterests.types';

const useContainer = () => {
  const phoneNumber = useRef<string | null>(null);
  const name = useRef<string | null>(null);
  const birthday = useRef<Date | null>(null);
  const interests = useRef<TInterest[] | null>(null);
  const gender = useRef<EUserGender | null>(null);

  const setPhoneNumber = useCallback((incomingPhoneNumber: string) => {
    phoneNumber.current = incomingPhoneNumber;
  }, []);

  const setName = useCallback((incomingName: string) => {
    name.current = incomingName;
  }, []);

  const setBirthday = useCallback((incomingBirthday: Date) => {
    birthday.current = incomingBirthday;
  }, []);

  const setInterests = useCallback((incomingInterests: TInterest[]) => {
    interests.current = [...incomingInterests];
  }, []);

  const setGender = useCallback((incomingGender: EUserGender) => {
    gender.current = incomingGender;
  }, []);

  const reset = useCallback(() => {
    birthday.current = null;
    name.current = null;
    interests.current = null;
    phoneNumber.current = null;
    gender.current = null;
  }, []);

  return {
    name,
    birthday,
    interests,
    gender,
    phoneNumber,
    setPhoneNumber,
    setName,
    setBirthday,
    setInterests,
    reset,
    setGender,
  };
};

const Container = createContainer(useContainer);
export const UnauthorizedStackProvider = Container.Provider;
export const useUnauthorizedStack = Container.useContainer;
