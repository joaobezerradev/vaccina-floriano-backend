import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { Transform } from 'class-transformer'
import { emailToLowerCase } from '../utils/email-to-lower.function'

export class AuthCredentialsDto {
  @ApiProperty({ example: 'admin@collamap.org' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(150)
  @Transform(({ value }) => emailToLowerCase(value))
  email: string

  @ApiProperty({ example: '123Change@' })
  @IsNotEmpty()
  password: string
}
