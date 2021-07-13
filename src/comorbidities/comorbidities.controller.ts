import { Body, Controller, Get, Post } from '@nestjs/common'
import { PriorityGroupEntity } from '../priority-groups/priority-group.entity'
import { ComorbiditiesService } from './comorbidities.service'

@Controller('comorbidities')
export class ComorbiditiesController {
  constructor (private readonly comorbiditiesService: ComorbiditiesService) {}

  @Get()
  find (): Promise<PriorityGroupEntity[]> {
    return this.comorbiditiesService.find()
  }

  @Post()
  create (
    @Body('message') message: string
  ): Promise<PriorityGroupEntity> {
    return this.comorbiditiesService.createComorbidity(message)
  }
}
