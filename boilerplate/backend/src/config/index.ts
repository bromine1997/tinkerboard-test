import * as local from './values/local';
import * as dev from './values/develop';
import * as beta from './values/beta';
import * as real from './values/real';
import { LoggerOptions } from 'winston';

export interface ConfigModel {
  env: 'local' | 'dev' | 'beta' | 'real';
  winstonOptions?: LoggerOptions;
  mongodbCipherText: string;
}

const configs: { [env: string]: ConfigModel } = {
  local: local.config,
  dev: dev.config,
  beta: beta.config,
  real: real.config,
};
const config = configs[`${process.env.SERVER_ENV || 'local'}`];
export default config;
