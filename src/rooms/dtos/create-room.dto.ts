import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Room name' })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Street name' })
  street: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Neighborhood name' })
  neighborhood: string
}
