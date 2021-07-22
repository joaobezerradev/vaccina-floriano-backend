import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateComorbidityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Comorbidity group type' })
  type: string
}
