import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'
import { RoomsModule } from '../rooms/rooms.module'
import { VaccinesModule } from '../vaccines/vaccines.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    RoomsModule,
    VaccinesModule,
    UsersModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
