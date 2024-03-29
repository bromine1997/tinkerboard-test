import { Injectable, LoggerService } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { format, createLogger, Logger, LoggerOptions } from 'winston';
import config from '../../config';

export const asyncLocalStorage = new AsyncLocalStorage();

export class ContextLoggerService implements LoggerService {
  private winstonLogger: Logger;

  createLoggerInstance(options?: LoggerOptions) {
    this.winstonLogger = createLogger(
      Object.assign(
        {
          format: format((info) => {
            const context = asyncLocalStorage.getStore() || {};
            return Object.assign(context, info);
          })(),
        },
        options
      )
    );
  }

  log(message: any, ...optionalParams: any[]): any {
    return this.winstonLogger.info(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): any {
    return this.winstonLogger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): any {
    return this.winstonLogger.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): any {
    return this.winstonLogger.debug(message, ...optionalParams);
  }

  getTraceId(): string {
    const store: any = asyncLocalStorage.getStore() || {};
    return store.traceId;
  }
}

@Injectable()
export class ContextLogger extends ContextLoggerService {
  constructor() {
    super();
    this.createLoggerInstance(config.winstonOptions);
  }
}
