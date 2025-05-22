export enum ESocketSubEvents {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CHARACTER_RESPONSE = 'character-response',
}

export enum ESocketPubEvents {
  CHARACTER_MESSAGE = 'character-message',
  INITIALIZE_INTEREST_BASED_CONVERSATION = 'initialize-interest-based-conversation',
}
