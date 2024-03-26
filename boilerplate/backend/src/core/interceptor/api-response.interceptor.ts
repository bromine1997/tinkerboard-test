import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ContextLogger } from '../context-logger.service';
import { Observable, map } from 'rxjs';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  constructor(private readonly logger: ContextLogger) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();

    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const formatLog = (msg: string) => `[${req.method} ${req.url}: ${msg}]`;
        this.logger.log(formatLog(JSON.stringify(data)), { spentMs: Date.now() - now });

        return data;
      })
    );
  }
}
