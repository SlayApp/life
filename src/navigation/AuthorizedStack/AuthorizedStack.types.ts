import {EAuthorizedStack} from '~/enums/EAuthorizedStack';

export type TAuthorizedStackParamList = {
  [EAuthorizedStack.Home]: undefined;
  [EAuthorizedStack.ChatOverview]: undefined;
  [EAuthorizedStack.Chat]: {
    id: number;
  };
  [EAuthorizedStack.Loading]: {interests: string[]};
};
