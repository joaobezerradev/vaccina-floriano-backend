import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsUUID
} from 'class-validator'
import { Match } from '../../commons/decorators/match.decorator'

export class ResetPasswordFilterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak'
  })
  password: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Match('password')
  passwordConfirmation: string

  @IsUUID()
  security: string
}
