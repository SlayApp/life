import {StackActions, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

import {messagesApi} from '~/api/api';
import {EAuthorizedStack} from '~/enums/EAuthorizedStack';
import {ESocketPubEvents} from '~/enums/ESubscriptionEvents';
import {useAPIRequest} from '~/hooks/useAPIRequest';
import {useRoute} from '~/hooks/useRoute';
import {useUser} from '~/hooks/useUser';
import {Socket} from '~/service/socket/Socket.class';
import {useSocket} from '~/service/socket/Socket.provider';

export const useLoadingScreen = () => {
  const user = useUser();
  const {isConnected} = useSocket();
  const {data: chats} = useAPIRequest(messagesApi.getAllUserChats, user.id);
  const {dispatch} = useNavigation();
  const {params} = useRoute<EAuthorizedStack.Loading>();

  useEffect(() => {
    if (chats && chats.length > 0) {
      dispatch(StackActions.replace(EAuthorizedStack.ChatOverview));
    }
  }, [chats, dispatch]);

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    Socket.emit(ESocketPubEvents.INITIALIZE_INTEREST_BASED_CONVERSATION, {
      userId: user.id,
      interests: params.interests,
    });
  }, [user.id, isConnected, params.interests]);

  return {user, chats};
};
