import { Body, Controller, Get, Post } from '@nestjs/common'
import { PriorityGroupEntity } from './priority-group.entity'
import { PriorityGroupsService } from './priority-groups.service'

@Controller('priority-groups')
export class PriorityGroupsController {
  constructor (private readonly priorityGroupsService: PriorityGroupsService) {}

  @Get()
  getAllPriorityGroups (): Promise<PriorityGroupEntity[]> {
    return this.priorityGroupsService.getAllPriorityGroups()
  }

  @Post()
  createPriorityGroup (
    @Body('message') message: string
  ): Promise<PriorityGroupEntity> {
    return this.priorityGroupsService.createPriorityGroup(message)
  }
}
