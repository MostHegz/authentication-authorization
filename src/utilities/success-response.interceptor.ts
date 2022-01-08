import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessResponse } from 'src/data';


@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
    private logger = new Logger('ResponseInterceptor');

    intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessResponse> {
        const res = context.switchToHttp().getResponse();

        return next.handle().pipe(map(data => {
            const returnedResponse = { code: res.statusCode, data: data };
            this.logger.verbose(returnedResponse);
            return returnedResponse;
        }));
    }

}
