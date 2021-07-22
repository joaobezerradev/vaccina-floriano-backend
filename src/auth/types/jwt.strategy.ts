import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../../users/users.service'

import { JwtPayload } from './jwt-payload.type'
import { UserEntity } from '../../users/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwt_accesstoken'
    })
  }

  async validate (payload: JwtPayload): Promise<UserEntity> {
    const user = await this.userService.getByEmail(payload.email)

    if (!user) throw new UnauthorizedException()

    return user
  }
}
