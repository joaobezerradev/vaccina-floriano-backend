import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AppointmentEntity } from './appointment.entity'
import { CreateAppointmentDto } from './dtos/create-appointment.dto'
import { ComorbiditiesService } from '../comorbidities/comorbidities.service'
import { PriorityGroupsService } from '../priority-groups/priority-groups.service'
import { RoomsService } from '../rooms/rooms.service'
import { VaccinesService } from '../vaccines/vaccines.service'
import { AppointmentRepository } from './appointment.repository'
import { startOfDay } from 'date-fns'
import { UsersService } from '../users/users.service'
import { Not } from 'typeorm'

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
    createAppointmentDto: CreateAppointmentDto
  ): Promise<AppointmentEntity> {
    const { comorbidityId, date, priorityGroupId, userId, roomId } = createAppointmentDto

    const [availableVaccines] = await Promise.all([
      this.vaccinesService.findByRoom(roomId, startOfDay(new Date(date))),
      this.comorbiditiesService.findOne(comorbidityId),
      this.priorityGroupsService.findOne(priorityGroupId),
      this.roomsService.findOne(roomId),
      this.usersService.findOne(userId)
    ])

    const vaccine = availableVaccines[0]

    const previewsAppointment = await this.findOne(userId)

    const newAppointment = this.appointmentRepository.create({
      date: new Date(date),
      userId,
      doseNumber: previewsAppointment ? 2 : 1,
      comorbidityId,
      priorityGroupId,
      vaccineId: vaccine.id

    })

    console.log(newAppointment)

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
