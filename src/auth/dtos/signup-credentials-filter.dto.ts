import {
  MinLength,
  IsString,
  MaxLength,
  Matches,
  IsNotEmpty,
  IsUUID
} from 'class-validator'

export class SignUpCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(150)
  name: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak'
  })
  password: string

  @IsNotEmpty()
  @IsUUID()
  security: string
}
