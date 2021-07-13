import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { RequestWithUser } from '../../types/request-user.type'
import { UserEntity } from '../../users/user.entity'

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>()
    return request.user
  }
)
