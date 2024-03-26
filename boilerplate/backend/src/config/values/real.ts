import { format } from 'winston';
import { ConfigModel } from '..';

export const config: ConfigModel = {
  env: 'real',
  winstonOptions: {
    level: 'info',
    exitOnError: false,
  },
  mongodbCipherText: '',
};
