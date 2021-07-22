import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class AdminCreateRoomDto {
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
