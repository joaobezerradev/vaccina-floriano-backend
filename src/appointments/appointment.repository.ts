import { now } from '../commons/utils/now.date'
import { EntityRepository, Repository } from 'typeorm'
import { AppointmentEntity } from './appointment.entity'
import { GetAppointmentDto } from './dtos/get-appointment.dto'

@EntityRepository(AppointmentEntity)
export class AppointmentRepository extends Repository<AppointmentEntity> {
  async getAll (): Promise<AppointmentEntity[]> {
    return this.find({
      where: {
        deletedAt: null
      }
    })
  }

  async removeAppointment (appointment: AppointmentEntity): Promise<void> {
    appointment.deletedAt = now()

    await this.save(appointment)
  }

  async getAppointment (
    getAppointmentDto: GetAppointmentDto
  ): Promise<AppointmentEntity> {
    const { personPhysicalCard } = getAppointmentDto

    const query = this.createQueryBuilder('appointment')
      .innerJoin('appointment.user', 'user')
      .select(['appointment', 'user'])
      .where('user.personPhysicalCard = :personPhysicalCard', {
        personPhysicalCard
      })

    return query.getOne()
  }

  async getAppointmentByPersonPhysicalCard (
    personPhysicalCard: string
  ): Promise<AppointmentEntity> {
    const query = this.createQueryBuilder('appointment')
      .innerJoin('appointment.user', 'user')
      .select(['appointment', 'user'])
      .where('user.personPhysicalCard = :personPhysicalCard', {
        personPhysicalCard
      })

    return query.getOne()
  }
}
