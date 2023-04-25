import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

interface IException extends HttpException {
  errors?: any[];
  responseBody?: any;
}

@Catch()
export class AllExceptionInterceptor implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): void {
    try {
      switch (true) {
        case exception instanceof HttpException:
          this.catchHttpExceptionError(exception as IException, host);
          return;

        default:
          this.catchDefaultException(exception, host);
      }
    } catch (error) {
      this.catchDefaultException(exception, host);
    }
  }

  public catchHttpExceptionError(
    exception: IException,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    let message = exception.getResponse() as {
      key: string;
      args: Record<string, any>;
      [key: string]: any;
    };

    message = message?.message || 'Something went wrong!';

    response.status(statusCode).json({ ...response, statusCode, message });
  }

  public catchDefaultException(
    exception: IException,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode, message;

    try {
      statusCode = exception.getStatus();
      message = exception.getResponse() as {
        key: string;
        args: Record<string, any>;
        [key: string]: any;
      };
      message = message?.message || 'Something went wrong!';
    } catch (error) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message ?? 'Internal Server Error';
    }

    response.status(statusCode).json({ statusCode, message });
  }
}
