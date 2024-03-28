import { LoggerOptions } from 'winston';

export interface ConfigModel {
  env: 'local' | 'dev' | 'real';
  winstonOptions?: LoggerOptions;
  mongo: {
    uri: string;
    authSource: string;
    username: string;
    password: string;
  };
}
