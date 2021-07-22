import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator'
import { UserGender } from '../enums'

export class CreateUserMetadataDto {
  @IsEnum(UserGender)
  @ApiPropertyOptional({ enum: UserGender, example: UserGender.M })
  gender: UserGender

  @IsDateString()
  @ApiProperty({ type: String, example: '22/04/2000' })
  birthDate: string

  @IsString()
  @ApiProperty({ type: String, example: '81999990000' })
  phone: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, example: '8555444' })
  identityCard: string | null

  @IsString()
  @ApiPropertyOptional({ type: String, example: 'Maria das Flores' })
  motherName: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, example: '123456789012345' })
  healthCard: string | null
}
