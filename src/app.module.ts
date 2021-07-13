import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AppointmentsModule } from './appointments/appointments.module'
import { ComorbiditiesModule } from './comorbidities/comorbidities.module'
import { PriorityGroupsModule } from './priority-groups/priority-groups.module'
import { VaccinesModule } from './vaccines/vaccines.module'
import { RoomsModule } from './rooms/rooms.module'
import typeormConfig from './configs/typeorm.config'
import { LoggerMiddleware } from './commons/middlewares/logger.middleware'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig()),
    UsersModule,
    AuthModule,
    AppointmentsModule,
    PriorityGroupsModule,
    ComorbiditiesModule,
    VaccinesModule,
    RoomsModule
  ]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
  }
}
