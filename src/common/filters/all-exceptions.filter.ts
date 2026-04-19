import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = isHttp
      ? (exception.getResponse() as any)?.message ?? exception.message
      : 'Internal server error';

    const stack = exception instanceof Error ? exception.stack : undefined;

    // 5xx 记 error，4xx 记 warn
    const level = status >= 500 ? 'error' : 'warn';
    this.logger.log(level, `Exception: ${JSON.stringify(message)}`, {
      context: 'ExceptionFilter',
      method: req.method,
      url: req.url,
      statusCode: status,
      stack,
    });

    res.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
