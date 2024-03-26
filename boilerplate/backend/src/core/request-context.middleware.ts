import { Injectable, NestMiddleware } from '@nestjs/common';
import { asyncLocalStorage } from './context-logger.service';
import { nanoid } from 'nanoid';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void): any {
    asyncLocalStorage.run(
      {
        prefix: `[${nanoid(10)}] [${req.method}] ${req.url} :: `,
        clientIP: req.ip,
      },
      next
    );
  }
}
