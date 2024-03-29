import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ContextLogger, asyncLocalStorage } from '../logger/context-logger.service';
import { nanoid } from 'nanoid';

/**
 * AsyncLocalStorage 에 요청별 traceId, clientIP 정보를 저장하고 AccessLog 를 남기는 미들웨어
 */
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly logger: ContextLogger) {}

  use(req: any, res: any, next: (error?: any) => void): any {
    const startMs = Date.now();

    asyncLocalStorage.run(
      {
        prefix: `[${req.method}] ${req.originalUrl} :: `,
        clientIP: req.ip,
        traceId: nanoid(10),
      },
      () => {
        res.on('finish', () => {
          let optionalParams = {
            responseStatusCode: res.statusCode,
            duration: Date.now() - startMs,
          };

          if (req.body) {
            optionalParams = Object.assign(optionalParams, { requestBody: JSON.stringify(req.body) });
          }

          if (res.statusCode < HttpStatus.BAD_REQUEST) {
            this.logger.log(`API replied`, optionalParams);
          } else {
            this.logger.error(`API replied`, optionalParams);
          }
        });

        return next();
      }
    );
  }
}
