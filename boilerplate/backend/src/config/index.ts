import * as local from './values/local';
import * as dev from './values/develop';
import * as real from './values/real';
import { ConfigModel } from './model';

const configs: { [env: string]: ConfigModel } = {
  local: local.config,
  dev: dev.config,
  real: real.config,
};
const config = configs[`${process.env.SERVER_ENV || 'local'}`];
export default config;
