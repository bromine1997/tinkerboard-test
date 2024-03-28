import { format, transports } from 'winston';
import { ConfigModel } from '../model';

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
        format.printf((info) => {
          const message = `${info.traceId} ${info.messgae}`;
          return `[${info.timestamp}] ${info.level}: ${message}`;
        })
      ),
    }),
  },
  mongo: {
    uri: 'mongodb://localhost:27017',
    authSource: 'test',
    username: 'root',
    password: 'root',
  },
};
