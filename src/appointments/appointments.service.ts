import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AppointmentEntity } from './appointment.entity'
import { CreateAppointmentDto } from './dtos/create-appointment.dto'
import { ComorbiditiesService } from '../comorbidities/comorbidities.service'
import { PriorityGroupsService } from '../priority-groups/priority-groups.service'
import { RoomsService } from '../rooms/rooms.service'
import { VaccinesService } from '../vaccines/vaccines.service'
import { AppointmentRepository } from './appointment.repository'
import { UsersService } from '../users/users.service'
import { Not } from 'typeorm'
import { startOfDayInBrazil } from '../commons/date'
import { UserEntity } from '../users/user.entity'
import { UserRoleEnum } from '../users/enums'

@Injectable()
export class AppointmentsService {
  constructor (
    @InjectRepository(AppointmentRepository)
    private readonly appointmentRepository: AppointmentRepository,
    private readonly comorbiditiesService: ComorbiditiesService,
    private readonly priorityGroupsService: PriorityGroupsService,
    private readonly roomsService: RoomsService,
    private readonly vaccinesService: VaccinesService,
    private readonly usersService: UsersService
  ) { }

  async getAppointmentByPersonPhysicalCard (
    personPhysicalCard: string
  ): Promise<AppointmentEntity> {
    return this.appointmentRepository.getAppointmentByPersonPhysicalCard(
      personPhysicalCard
    )
  }

  async createAppointment (
    createAppointmentDto: CreateAppointmentDto,
    user: UserEntity
  ): Promise<AppointmentEntity> {
    const { comorbidityId, date, priorityGroupId, roomId } = createAppointmentDto

    if (user.role !== UserRoleEnum.COMMON) {
      throw new UnprocessableEntityException('User needs have commmon role')
    }

    const [availableVaccines] = await Promise.all([
      this.vaccinesService.findByRoom(roomId, startOfDayInBrazil(date)),
      this.comorbiditiesService.findOne(comorbidityId),
      this.priorityGroupsService.findOne(priorityGroupId),
      this.roomsService.findOne(roomId),
      this.usersService.findOne(user.id)
    ])

    const vaccine = availableVaccines[0]

    const newAppointment = this.appointmentRepository.create({
      date,
      userId: user.id,
      doseNumber: null,
      comorbidityId,
      priorityGroupId,
      vaccineId: vaccine.id

    })

    vaccine.ownerId = user.id

    await this.vaccinesService.save(vaccine)
    return this.appointmentRepository.save(newAppointment)
  }

  async findOne (userId: string): Promise<AppointmentEntity | null> {
    const foundOne = await this.appointmentRepository.findOne({
      where: {
        userId,
        concludeAt: Not(null)
      }
    })

    return foundOne
  }
}
