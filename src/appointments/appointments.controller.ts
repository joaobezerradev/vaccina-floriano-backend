import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { AppointmentEntity } from './appointment.entity'
import { AppointmentsService } from './appointments.service'
import { CreateAppointmentDto } from './dtos/create-appointment.dto'
import { GetUser } from '../auth/decorators/get-user.decorator'
import { UserEntity } from '../users/user.entity'

@Controller('appointments')
export class AppointmentsController {
  constructor (private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create (
    @GetUser() user: UserEntity,
    @Body() createAppointmentDto: CreateAppointmentDto
  ) :Promise<AppointmentEntity> {
    return this.appointmentsService.createAppointment(
      createAppointmentDto
    )
  }

  @Get('/personPhysicalCard/:personPhysicalCard')
  getAppointmentByPersonPhysicalCard (
    @Param('personPhysicalCard') personPhysicalCard: string
  ): Promise<AppointmentEntity> {
    return this.appointmentsService.getAppointmentByPersonPhysicalCard(
      personPhysicalCard
    )
  }
}
