import { Controller, Post, Body, Get } from '@nestjs/common'
import { VaccinesService } from './vaccines.service'
import { CreateVaccineDto } from './dto/create-vaccine.dto'
import { VaccineEntity } from './vaccine.entity'

@Controller('vaccines')
export class VaccinesController {
  constructor (private readonly vaccinesService: VaccinesService) {}

  @Get()
  async find ():Promise<VaccineEntity[]> {
    const count = await this.vaccinesService.find()
    console.log(count.length)
    return count
  }

  @Post()
  create (@Body() createVaccineDto: CreateVaccineDto):Promise<void> {
    return this.vaccinesService.create(createVaccineDto)
  }
}
