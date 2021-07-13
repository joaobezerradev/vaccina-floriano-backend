import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { emailToLowerCase } from '../utils/email-to-lower.function'

export class ForgotPasswordFilterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(150)
  @ApiProperty({ type: String, example: 'admin@collamap.org' })
  @Transform(({ value }) => emailToLowerCase(value))
  email: string
}
