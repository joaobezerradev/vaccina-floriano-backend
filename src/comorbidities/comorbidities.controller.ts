import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { PriorityGroupEntity } from '../priority-groups/priority-group.entity'
import { ComorbiditiesService } from './comorbidities.service'
import { CreateComorbidityDto } from './dtos/create-comorbidity.dto'

@Controller('comorbidities')
@ApiTags('comorbidities')
@UseGuards(AuthGuard('jwt'))
export class ComorbiditiesController {
  constructor (private readonly comorbiditiesService: ComorbiditiesService) {}

  @Get()
  find (): Promise<PriorityGroupEntity[]> {
    return this.comorbiditiesService.find()
  }

  @Post()
  create (
    @Body() createComorbidity: CreateComorbidityDto
  ): Promise<PriorityGroupEntity> {
    return this.comorbiditiesService.createComorbidity(createComorbidity)
  }
}
