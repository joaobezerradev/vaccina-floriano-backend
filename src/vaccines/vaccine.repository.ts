import { EntityRepository, Repository } from 'typeorm'
import { VaccineEntity } from './vaccine.entity'

@EntityRepository(VaccineEntity)
export class VaccineRepository extends Repository<VaccineEntity> {
  getUserVaccine (personPhysicalCard: string): Promise<VaccineEntity> {
    return this.findOne({
      where: {
        owner: {
          personPhysicalCard
        },
        applyAt: null
      }
    })
  }
}
