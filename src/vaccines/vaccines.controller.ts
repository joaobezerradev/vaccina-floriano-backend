import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { VaccinesService } from './vaccines.service'
import { CreateVaccineDto } from './dtos/create-vaccine.dto'
import { VaccineEntity } from './vaccine.entity'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'

@Controller('vaccines')
@ApiTags('vaccines')
@UseGuards(AuthGuard('jwt'))
export class VaccinesController {
  constructor (private readonly vaccinesService: VaccinesService) {}

  @Get()
  async find ():Promise<VaccineEntity[]> {
    return this.vaccinesService.find()
  }

  @Post()
  create (@Body() createVaccineDto: CreateVaccineDto):Promise<void> {
    return this.vaccinesService.create(createVaccineDto)
  }
}
