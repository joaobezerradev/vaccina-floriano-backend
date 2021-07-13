import { EntityRepository, Repository } from 'typeorm'
import { PriorityGroupEntity } from './priority-group.entity'

@EntityRepository(PriorityGroupEntity)
export class PriorityGroupRepository extends Repository<PriorityGroupEntity> {
  async getAllPriorityGroups (): Promise<PriorityGroupEntity[]> {
    return this.find({
      where: {
        deletedAt: null
      }
    })
  }
}
