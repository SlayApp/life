export enum ESocketSubEvents {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CHARACTER_RESPONSE = 'character-response',
  CHARACTER_TYPING = 'character-typing',
}

export enum ESocketPubEvents {
  CHARACTER_MESSAGE = 'character-message',
  INITIALIZE_INTEREST_BASED_CONVERSATION = 'initilize-interest-based-conversation',
}
