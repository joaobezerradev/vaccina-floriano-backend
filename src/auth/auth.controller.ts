import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserEntity } from '../users/user.entity'

import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dtos/auth-credentials-filter.dto'
import { ForgotPasswordFilterDto } from './dtos/forgot-password-filter.dto'
import { ResetPasswordFilterDto } from './dtos/reset-password-filter.dto'
import { SignUpDto } from './dtos/sign-up.dto'
import { Token } from './types/token.type'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp (
    @Body(new ValidationPipe({ transform: true })) signUpDto: SignUpDto
  ): Promise<UserEntity> {
    return this.authService.signUp(signUpDto)
  }

  @Post('/sign-in')
  signIn (
    @Body(new ValidationPipe({ transform: true }))
      authCredentialsDto: AuthCredentialsDto
  ): Promise<Token> {
    return this.authService.signIn(authCredentialsDto)
  }

  @Post('/refresh-token')
  async getRefreshToken (
    @Body() bodyRefreshToken: { refreshToken: string }
  ): Promise<Token> {
    return this.authService.getTokenByRefreshToken(
      bodyRefreshToken.refreshToken
    )
  }

  @Post('/forgot-password')
  async forgotPassword (
    @Body(new ValidationPipe({ transform: true }))
      filterDto: ForgotPasswordFilterDto
  ): Promise<void> {
    return this.authService.forgotPassword(filterDto)
  }

  @Post('/reset-password')
  async resetPassword (
    @Body(ValidationPipe) filterDto: ResetPasswordFilterDto
  ): Promise<Token> {
    return this.authService.resetPassword(filterDto)
  }
}
