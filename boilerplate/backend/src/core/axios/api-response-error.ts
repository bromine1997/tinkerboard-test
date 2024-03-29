import { HttpStatus } from '@nestjs/common';

export class ApiError extends Error {
  protected _msg: string;
  protected _code?: HttpStatus;

  constructor(msg: string, code?: HttpStatus) {
    super(msg);
    this.name = 'ApiError';
    this._msg = msg;
    this._code = code;
  }

  get message() {
    return this._msg;
  }

  get code() {
    return this._code;
  }
}
