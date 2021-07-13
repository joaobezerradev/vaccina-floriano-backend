import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'

export class ErrorHandler {
  public handle (error?: { message: unknown; code: unknown }): Error {
    if (error instanceof Error) {
      if (error instanceof ConflictException) {
        return new ConflictException(error?.message)
      }
      if (error instanceof NotFoundException) {
        return new NotFoundException(error?.message)
      }
      if (error instanceof UnauthorizedException) {
        return new UnauthorizedException(error?.message)
      }
    }
    if (error?.code === '23503') {
      throw new ConflictException('Referential integrity error')
    }
    if (error?.code === '22007' || error?.code === '22008') {
      throw new ConflictException('Date invalid')
    }
    return new InternalServerErrorException(error.message)
  }
}

const errorHandler = new ErrorHandler()
export { errorHandler }
