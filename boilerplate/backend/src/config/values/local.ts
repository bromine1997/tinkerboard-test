import { format, transports } from 'winston';
import { ConfigModel } from '..';

export const config: ConfigModel = {
  env: 'local',
  winstonOptions: {
    level: 'debug',
    transports: new transports.Console({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.colorize(),
        format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.prefix || ''}${info.message}`)
      ),
    }),
  },
  mongodbCipherText: '',
};
