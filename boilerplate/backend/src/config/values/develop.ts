import { format } from 'winston';
import { ConfigModel } from '..';

export const config: ConfigModel = {
  env: 'dev',
  winstonOptions: {
    level: 'debug',
    exitOnError: false,
  },
  mongodbCipherText: '',
};
