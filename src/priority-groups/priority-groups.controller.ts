import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { CreatePriorityGroupDto } from './dtos/create-priority-group.dto'
import { PriorityGroupEntity } from './priority-group.entity'
import { PriorityGroupsService } from './priority-groups.service'

@Controller('priority-groups')
@ApiTags('priority-groups')
@UseGuards(AuthGuard('jwt'))
export class PriorityGroupsController {
  constructor (private readonly priorityGroupsService: PriorityGroupsService) {}

  @Get()
  getAllPriorityGroups (): Promise<PriorityGroupEntity[]> {
    return this.priorityGroupsService.getAllPriorityGroups()
  }

  @Post()
  createPriorityGroup (
    @Body() createPriorityGroup: CreatePriorityGroupDto): Promise<PriorityGroupEntity> {
    return this.priorityGroupsService.createPriorityGroup(createPriorityGroup)
  }
}
