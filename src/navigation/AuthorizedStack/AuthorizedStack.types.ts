import {EAuthorizedStack} from '~/enums/EAuthorizedStack';

export type TAuthorizedStackParamList = {
  [EAuthorizedStack.Home]: undefined;
  [EAuthorizedStack.ChatOverview]: undefined;
  [EAuthorizedStack.Chat]: {
    id: string;
  };
  [EAuthorizedStack.Loading]: {interests: string[]};
};
