/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException
} from '@nestjs/common'
import { Response } from 'express'
@Catch()
export class DefaultExceptionsFilter implements ExceptionFilter {
  parseMessages (messages: string[]): void {
    return messages.reduce((acc: any, cur: string) => {
      const key = cur.split(' ').shift()
      const hasKey = Object.keys(acc).includes(key)

      if (!hasKey) {
        acc[key] = []
      }

      acc[key].push(cur.replace(key, '').slice(1))
      return acc
    }, {})
  }

  catch (exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const body: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            message: exception.message
          }

    response.status(status).send({
      statusCode: status,
      status: status === 500 ? 'fail' : 'error',
      errors:
          typeof body.message === 'object'
            ? this.parseMessages(body.message)
            : body.message
    }
    )
  }
}
