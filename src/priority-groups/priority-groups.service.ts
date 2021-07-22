import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePriorityGroupDto } from './dtos/create-priority-group.dto'
import { PriorityGroupEntity } from './priority-group.entity'
import { PriorityGroupRepository } from './priority-group.repository'

@Injectable()
export class PriorityGroupsService {
  constructor (
    @InjectRepository(PriorityGroupRepository)
    private priorityGroupRepository: PriorityGroupRepository
  ) {}

  async getAllPriorityGroups (): Promise<PriorityGroupEntity[]> {
    return this.priorityGroupRepository.getAllPriorityGroups()
  }

  async createPriorityGroup (createPriorityGroup:CreatePriorityGroupDto): Promise<PriorityGroupEntity> {
    const newPriorityGroup = this.priorityGroupRepository.create(createPriorityGroup)

    return this.priorityGroupRepository.save(newPriorityGroup)
  }

  async findOne (priorityGroupId: string): Promise<PriorityGroupEntity> {
    const foundPriorityGroup = await this.priorityGroupRepository.findOne({
      where: {
        id: priorityGroupId,
        deletedAt: null
      }
    })

    if (!foundPriorityGroup) throw new NotFoundException(`PriorityGroup with ${priorityGroupId} not found.`)

    return foundPriorityGroup
  }
}
