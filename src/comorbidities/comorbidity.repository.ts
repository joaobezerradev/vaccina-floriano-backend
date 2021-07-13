import { EntityRepository, Repository } from 'typeorm'
import { ComorbidityEntity } from './comorbidity.entity'

@EntityRepository(ComorbidityEntity)
export class ComorbidityRepository extends Repository<ComorbidityEntity> {
  async getAllComorbidities (): Promise<ComorbidityEntity[]> {
    return this.find({
      where: {
        deletedAt: null
      }
    })
  }
}
