import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsString, IsUUID } from 'class-validator'

export class CreateAppointmentDto {
  @IsDateString()
  @ApiProperty({ type: String, example: '2021-07-11T22:33:40.652Z' })
  date: string

  @IsUUID()
  @IsString()
  @ApiProperty({ type: String, example: '76be05b9-f5a6-45a9-9ef7-ca87629f5023' })
  priorityGroupId: string

  @IsUUID()
  @IsString()
  @ApiProperty({ type: String, example: 'f7328475-df8f-4198-a8f3-1fc64d32ac1c' })
  comorbidityId: string

  @IsUUID()
  @IsString()
  @ApiProperty({ type: String, example: '5f0ec1a1-30bf-4b6f-80a5-9cb5c5c86628' })
  roomId: string
}
