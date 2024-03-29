import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ContextLogger } from '../logger/context-logger.service';
import { ApiError } from '../axios/api-response-error';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: ContextLogger) {}

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    let optionalParams = {
      traceId: this.logger.getTraceId(),
    };

    if (req.body) {
      optionalParams = Object.assign(optionalParams, { requestBody: JSON.stringify(req.body) });
    }

    let code: number;
    let message: string;

    if (exception instanceof HttpException) {
      const response: any = exception.getResponse();
      code = exception.getStatus();

      if (typeof response === 'string') {
        message = response;
      } else if (Array.isArray(response.message)) {
        message = response.message.join(', ');
      } else {
        message = response.message;
      }

      this.logger.error(message, optionalParams);
    } else if (exception instanceof ApiError) {
      code = exception.code ?? HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;

      this.logger.error(exception.message, optionalParams);
    } else {
      code = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message ?? '알 수 없는 에러';

      this.logger.error(exception.stack, optionalParams);
    }

    return res.code(code).send({ message });
  }
}
