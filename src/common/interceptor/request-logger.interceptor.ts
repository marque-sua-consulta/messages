import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { formatUnixTimestamp } from '../utils/time';
import { blue, green, magenta, yellow, cyan } from '../utils/colors';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { ip, method, originalUrl } = request;
    const userAgent = request.headers['user-agent'] || '';

    const startTime = process.hrtime();

    return next.handle().pipe(
      tap(() => {
        const now = Date.now();
        const elapsedTime = process.hrtime(startTime);
        const elapsedTimeInMilliseconds =
          elapsedTime[0] * 1000 + elapsedTime[1] / 1000000;
        const formattedDate = formatUnixTimestamp(now);

        this.logger.log(
          `${green('REQUEST')}: ${blue(method)} ${blue(originalUrl)} | ${green('REQUESTER IP')}: ${cyan(ip)} ${userAgent} - ${green('DATA')}: ${magenta(formattedDate)} ${yellow(`${elapsedTimeInMilliseconds.toFixed(2)}ms`)}`,
        );
      }),
    );
  }
}
