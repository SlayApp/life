import {
  AuthApi,
  Configuration,
  InterestMatchingApi,
  MessagesApi,
  UsersApi,
} from 'api-client';

import {Environment} from '~/service/Environment';
import {TExtendAll} from '~/types/TExtendAll';

const configuration = new Configuration({
  basePath: Environment.API_BASE_URL,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function create<T extends Record<string, any>>(instance: T) {
  const proto = Object.getPrototypeOf(instance);
  const self = instance.constructor.name;
  function getKeyName(this: () => void) {
    return `${self}-${this.name}`;
  }
  Object.getOwnPropertyNames(proto)
    .filter(key => typeof instance[key] === 'function' && key !== 'constructor')
    .forEach(key => {
      // @ts-expect-error can't fix
      instance[key] = instance[key].bind(instance) as TPrototype;
      instance[key].getKeyName = getKeyName;
    });

  return instance as TExtendAll<T, {getKeyName: () => string}>;
}

export const usersApi = create(new UsersApi(configuration));
export const authApi = create(new AuthApi(configuration));
export const interestApi = create(new InterestMatchingApi(configuration));
export const messagesApi = create(new MessagesApi(configuration));
