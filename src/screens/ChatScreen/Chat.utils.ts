import {MessageResponseDto} from 'api-client/api';
import {randomUUID} from 'expo-crypto';

import {DATE_HEADER_ID} from './Chat.constants';
import {TMessage} from './Chat.types';

export function buildTimeline(messages: MessageResponseDto[]): TMessage[] {
  const timeline: TMessage[] = [];
  let currentDate: string | null = null;

  for (const msg of messages.reverse()) {
    const msgDate = msg.createdAt.slice(0, 10);

    if (msgDate !== currentDate) {
      timeline.push({
        id: DATE_HEADER_ID,
        date: msgDate,
        deduplicationId: randomUUID(),
      });
      currentDate = msgDate;
    }

    timeline.push(msg);
  }

  return timeline.reverse();
}
