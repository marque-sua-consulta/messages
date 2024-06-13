import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    Logger.debug(exception);
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    const { method, url, ip } = request;

    const stackTrace = exception.stack;
    if (status >= 500) {
      Logger.error(
        `- SYSTEM ERROR: ${JSON.stringify(error)} Stack Trace: ${stackTrace} HttpExceptionFilter Request: ${method} ${url} from ${ip}`,
      );
    } else {
      Logger.warn(
        `- CLIENT REQUEST ERROR: ${JSON.stringify(error)} HttpExceptionFilter Request: ${method} ${url} from ${ip}`,
        `- SYSTEM ERROR: ${JSON.stringify(error)} Stack Trace: ${stackTrace} HttpExceptionFilter Request: ${method} ${url} from ${ip}`,
      );
    }

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
      method,
      url,
      ip,
    });
  }
}
