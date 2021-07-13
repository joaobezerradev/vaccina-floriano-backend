import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../../users/users.service'

import { JwtPayload } from './jwt-payload.type'
import { UserEntity } from '../../users/user.entity'
import { RequestWithUser } from '../../types/request-user.type'
import { REQUEST } from '@nestjs/core'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    @Inject(REQUEST)
    private request:RequestWithUser,
    private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwt_accesstoken'
    })
  }

  async validate (payload: JwtPayload): Promise<UserEntity> {
    const { email } = payload
    const user = await this.userService.getByEmail(email)

    if (!user) {
      throw new UnauthorizedException()
    }
    this.request.user = user

    return user
  }
}
