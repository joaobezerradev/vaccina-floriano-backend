import { ValidationPipe, ArgumentMetadata, BadRequestException, MisdirectedException } from '@nestjs/common'

export class Validation421Pipe extends ValidationPipe {
  public async transform (
    value: unknown,
    metadata: ArgumentMetadata
  ): Promise<unknown> {
    try {
      return await super.transform(value, metadata)
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new MisdirectedException(e.getResponse())
      }
    }
    return null
  }
}
