import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResData } from './resData';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  private readonly logger = new Logger(CatchEverythingFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception instanceof Error
          ? exception.message
          : 'Internal server error';

    const responseBody = new ResData(httpStatus, 'An error occurred', null, {
      message: typeof message === 'string' ? message : undefined,
      ...(typeof message === 'object' ? message : {}),
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
    });

    this.logger.error(`HTTP Status: ${httpStatus} Error Message: ${message}`);

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
