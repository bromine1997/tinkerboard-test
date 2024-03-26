import { FastifyReply, FastifyRequest } from 'fastify';

export class WordCheckerError extends Error {
  constructor(msg: string, public obj?: Object) {
    super(msg);
    this.name = 'WordCheckerError';
  }
}

export class AuthError extends WordCheckerError {
  constructor(msg?: string, public ojb?: Object) {
    super(msg || 'not authorization');
    this.name = 'AuthError';
  }
}

export class NotFoundError extends WordCheckerError {
  constructor(msg?: string, public ojb?: Object) {
    super(msg || 'not found');
    this.name = 'NotFoundError';
  }
}

export class InvalidPageSizeError extends WordCheckerError {
  constructor(msg?: string, public ojb?: Object) {
    super(msg || 'page size must be more than 0');
    this.name = 'InvalidPageSizeError';
  }
}

export class DbTimeoutError extends WordCheckerError {
  constructor(msg?: string, public ojb?: Object) {
    super(msg || 'operation exceeded time limit');
    this.name = 'DbTimeoutError';
  }
}

/**
 * 에러 응답 DTO
 */
export class WordCheckerErrorReply {
  // API 성공여부
  success: boolean;
  error: string;
  message: string;
  traceId: string;
}

export interface IWordCheckerErrorInfo extends WordCheckerErrorReply {
  data: {
    reqBody?: string;
    stack?: string;
    obj?: string;
    spentMs?: number;
  };
}

export function getWordCheckerErrorInfo(req: FastifyRequest, reply: FastifyReply, err: Error): IWordCheckerErrorInfo {
  const obj = err instanceof WordCheckerError ? err.obj : undefined;
  return {
    data: {
      reqBody: JSON.stringify(req.body),
      stack: err.stack,
      obj: JSON.stringify(obj),
      spentMs: Math.round(reply.getResponseTime()),
    },
    message: `[${req.method}] ${req.url}: ${err.message}`,
    error: err.name,
    success: false,
    traceId: req.id,
  };
}
