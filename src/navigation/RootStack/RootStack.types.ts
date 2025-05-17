import {NavigatorScreenParams} from '@react-navigation/native';
import {UserResponseDto} from 'api-client/api';

import {ERootStack} from '~/enums/ERootStack';
import {TAuthorizedStackParamList} from '~/navigation/AuthorizedStack/AuthorizedStack.types';
import {TUnauthorizedStackParamList} from '~/navigation/UnauthorizedStack/UnauthorizedStack.types';

export type TRootStackParamList = {
  [ERootStack.Unauthorized]: NavigatorScreenParams<TUnauthorizedStackParamList>;
  [ERootStack.Authorized]: NavigatorScreenParams<TAuthorizedStackParamList> & {
    user: UserResponseDto;
  };
};
