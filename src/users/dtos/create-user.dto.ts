import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, ValidateNested } from 'class-validator'
import { UserRoleEnum } from '../enums'
import { CreateUserAddressDto } from './create-user-address.dto'
import { CreateUserMetadataDto } from './create-user-metadata.dto'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Jhon Doe' })
  name: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'jhon.doe@email.com' })
  email: string

  @IsString()
  @Length(11)
  @ApiProperty({ type: String, example: '99999999999' })
  personPhysicalCard: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Teste!123' })
  password: string

  @IsString()
  @ApiProperty({ enum: UserRoleEnum, example: UserRoleEnum.MASTER })
  role: UserRoleEnum

  @ValidateNested({ each: true })
  @IsOptional()
  @ApiPropertyOptional({ type: CreateUserMetadataDto, example: CreateUserMetadataDto })
  metadata?: CreateUserMetadataDto

  @ValidateNested({ each: true })
  @IsOptional()
  @ApiPropertyOptional({ type: CreateUserAddressDto, example: CreateUserAddressDto })
  address?: CreateUserAddressDto
}
