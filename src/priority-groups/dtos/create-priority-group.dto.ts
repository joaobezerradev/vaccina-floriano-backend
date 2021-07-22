import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreatePriorityGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Priority group type' })
  type:string
}
