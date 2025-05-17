import {RouteProp, useRoute as useORoute} from '@react-navigation/native';

import {EAuthorizedStack} from '~/enums/EAuthorizedStack';
import {ERootStack} from '~/enums/ERootStack';
import {EUnauthorizedStack} from '~/enums/EUnauthorizedStack';
import {TRootParamList} from '~/types/navigation';

export const useRoute = <
  T extends ERootStack | EUnauthorizedStack | EAuthorizedStack,
>() => useORoute<RouteProp<TRootParamList, T>>();
