import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AppointmentsModule } from './appointments/appointments.module'
import { ComorbiditiesModule } from './comorbidities/comorbidities.module'
import { PriorityGroupsModule } from './priority-groups/priority-groups.module'
import { VaccinesModule } from './vaccines/vaccines.module'
import { RoomsModule } from './rooms/rooms.module'
import typeormConfig from './config/typeorm.config'
import { LoggerMiddleware } from './commons/middlewares/logger.middleware'
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig()),
    UsersModule,
    AuthModule,
    AppointmentsModule,
    PriorityGroupsModule,
    ComorbiditiesModule,
    VaccinesModule,
    RoomsModule,
    AdminModule
  ]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
  }
}
