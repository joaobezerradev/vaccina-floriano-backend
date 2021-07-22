import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserAddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Paraiba' })
  stateName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'João Pessoa' })
  cityName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '58041-160' })
  zipCode: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Expedicionários' })
  neighborhood: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Rua Escritor José Vieira' })
  street: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, example: 'Casa' })
  complement: string | null

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '264' })
  number: string
}
