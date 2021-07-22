import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

export abstract class BaseDto {
  @ApiProperty({ example: '5153817f-b16e-4cf6-8664-614c65795a46' })
  id: string

  @ApiHideProperty()
  @Exclude()
  alternativeid: number

  @ApiProperty()
  @Expose()
  createddate: string

  @ApiHideProperty()
  @Exclude()
  updateddate: string

  @ApiHideProperty()
  @Exclude()
  deleteddate: string
}
