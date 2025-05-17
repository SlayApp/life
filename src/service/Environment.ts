export interface IEnvironment {
  API_BASE_URL: string;
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
export const Environment: IEnvironment = require('../../.env.json');
