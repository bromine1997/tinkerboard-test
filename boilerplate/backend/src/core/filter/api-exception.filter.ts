import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ContextLogger } from '../context-logger.service';
import { AuthError, DbTimeoutError, NotFoundError, WordCheckerError, getWordCheckerErrorInfo } from '../error';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost, private readonly logger: ContextLogger) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const formatLog = (msg: string) => `[${req.method}] ${req.url}: ${msg}`;

    let statusCode;
    let message;

    if (exception instanceof NotFoundError) {
      const errInfo = getWordCheckerErrorInfo(req, res, exception);
      this.logger.warn(errInfo.message, errInfo.data);

      return res.status(HttpStatus.NO_CONTENT).send();
    } else if (exception instanceof DbTimeoutError) {
      statusCode = HttpStatus.REQUEST_TIMEOUT;
      message = exception.message;
      this.logger.error(formatLog(message));
    } else if (exception instanceof WordCheckerError) {
      statusCode = exception instanceof AuthError ? HttpStatus.UNAUTHORIZED : HttpStatus.BAD_REQUEST;
      message = exception.message;
      this.logger.error(formatLog(message));
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const response: any = exception.getResponse();

      if (typeof response === 'string') {
        message = response;
      } else if (Array.isArray(response.message)) {
        message = response.message.join(',');
      } else {
        message = response.message;
      }

      this.logger.error(formatLog(message));
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
      this.logger.error(formatLog(exception.stack));
    }

    return res.code(statusCode).send({ success: false, error: exception.name, message });
  }
}
