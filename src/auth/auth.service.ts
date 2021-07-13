import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { UserEntity } from '../users/user.entity'
import { errorHandler } from '../commons/handlers/error.handler'
import { now } from '../commons/utils/now.date'

import { UsersService } from '../users/users.service'
import { AuthCredentialsDto } from './dtos/auth-credentials-filter.dto'

import { ForgotPasswordFilterDto } from './dtos/forgot-password-filter.dto'
import { ResetPasswordFilterDto } from './dtos/reset-password-filter.dto'
import { SignUpDto } from './dtos/sign-up.dto'
import { DecodedToken } from './types/decoded-token.type'
import { JwtPayload } from './types/jwt-payload.type'
import { CreateToken, Token } from './types/token.type'

@Injectable()
export class AuthService {
  constructor (
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async signUp (signUpDto: SignUpDto): Promise<UserEntity> {
    return this.userService.create({ ...signUpDto })
  }

  async signIn (authCredentialsDto: AuthCredentialsDto): Promise<Token> {
    try {
      const email = await this.userService.validateUserPassword(
        authCredentialsDto
      )

      if (!email) {
        throw new UnauthorizedException('Invalid credentials')
      }

      const user = await this.userService.getByEmail(email)

      if (!user) {
        throw new UnauthorizedException('User not found.')
      }

      return this.generateToken({
        ...user
      })
    } catch (error) {
      throw errorHandler.handle(error)
    }
  }

  async forgotPassword (filterDto: ForgotPasswordFilterDto): Promise<void> {
    try {
      const { email } = filterDto

      const user = await this.userService.getByEmail(email)

      if (!user) {
        throw new NotFoundException('User not found.')
      }
      await this.userService.forgotPassword(user)
    } catch (error) {
      throw errorHandler.handle(error)
    }
  }

  async resetPassword (
    resetPasswordFilterDto: ResetPasswordFilterDto
  ): Promise<Token> {
    try {
      const { security, password, passwordConfirmation } =
        resetPasswordFilterDto

      if (password !== passwordConfirmation) {
        throw new ConflictException('The password entered does not match')
      }

      const foundUser = await this.userService.getUserBySecurityStamp(security)

      if (!foundUser.emailConfirmedAt) {
        foundUser.emailConfirmedAt = now()
      }

      foundUser.password = await foundUser.hashPassword(password)

      await this.userService.save(foundUser)
      const authCredentialsDto: AuthCredentialsDto = {
        email: foundUser.email,
        password
      }

      return this.signIn(authCredentialsDto)
    } catch (error) {
      throw errorHandler.handle(error)
    }
  }

  private generateToken (createToken: CreateToken): Token {
    const { id, email, name } = createToken
    const payload: JwtPayload = { email }
    const accessToken = this.jwtService.sign(payload)

    const refreshTokenOptions: JwtSignOptions = {
      expiresIn: '7d',
      secret: 'jwt_accesstoken'
    }

    const refreshToken = this.jwtService.sign(payload, refreshTokenOptions)

    return {
      accessToken,
      refreshToken,
      id,
      name,
      email
    }
  }

  async getTokenByRefreshToken (refreshToken: string): Promise<Token> {
    try {
      const refreshTokenOptions: JwtSignOptions = {
        expiresIn: '10d',
        secret: 'jwt_refreshtoken'
      }

      const { email }: DecodedToken = await this.jwtService.verify(
        refreshToken,
        refreshTokenOptions
      )

      const user = await this.userService.getByEmail(email)

      return this.generateToken({
        ...user
      })
    } catch (error) {
      throw new UnauthorizedException('Invalid Signature')
    }
  }

  async confirmEmail (security: string): Promise<void> {
    try {
      const user = await this.userService.getUserBySecurityStamp(security)

      if (user) {
        user.emailConfirmedAt = now()

        await this.userService.save(user)
      }
    } catch (error) {
      throw errorHandler.handle(error)
    }
  }
}
