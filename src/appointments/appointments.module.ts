import { Module } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { AppointmentsController } from './appointments.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppointmentRepository } from './appointment.repository'
import { ComorbiditiesModule } from '../comorbidities/comorbidities.module'
import { PriorityGroupsModule } from '../priority-groups/priority-groups.module'
import { RoomsModule } from '../rooms/rooms.module'
import { UsersModule } from '../users/users.module'
import { VaccinesModule } from '../vaccines/vaccines.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentRepository]),
    ComorbiditiesModule,
    PriorityGroupsModule,
    RoomsModule,
    UsersModule,
    VaccinesModule
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService]
})
export class AppointmentsModule {}
