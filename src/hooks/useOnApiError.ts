import {isAxiosError} from 'axios';

import {log} from '~/utils/log.util';

export const onApiError = (
  error: unknown,
  which: string,
  fingerprint: string,
) => {
  if (!isAxiosError(error)) {
    log.error(`[api] - ${which} Error (unknown) ${fingerprint}`, error);

    return;
  }

  const code = error.response?.data?.code ?? error.code ?? 'unknown';
  log.error(`[api] - ${which} Error (${code}) ${fingerprint}`, error);
};
