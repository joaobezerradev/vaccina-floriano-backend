import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware, Logger } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use (request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request
    const userAgent = request.get('user-agent') || ''

    response.on('finish', () => {
      const { statusCode } = response
      const contentLength = response.get('content-length')
      if (statusCode < 400) {
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`
        )
      } else {
        this.logger.error(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`
        )
      }
    })

    next()
  }
}
