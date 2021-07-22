import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  statusCode: number;
  status: string;
  data: T
}

@Injectable()
export class TransformInterceptor<T>
implements NestInterceptor<T, Response<T>> {
  intercept (ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const { statusCode } = ctx.switchToHttp().getResponse()

    return next.handle().pipe(
      map((data) => {
        return {
          statusCode,
          status: 'success',
          data
        }
      })
    )
  }
}
