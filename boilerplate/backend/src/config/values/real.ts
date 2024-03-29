import { format, transports } from 'winston';
import { ConfigModel } from '../model';

// TODO: logger 설정 변경 필요(real 환경에 맞게), 현재는 console 로그
// TODO: real 환경용 mongodb 환경설정 필요
export const config: ConfigModel = {
  env: 'real',
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
    authSource: 'admin',
    username: 'root',
    password: 'root',
  },
};
