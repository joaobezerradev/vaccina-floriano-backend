import { Module } from '@nestjs/common'
import { VaccinesService } from './vaccines.service'
import { VaccinesController } from './vaccines.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VaccineRepository } from './vaccine.repository'
import { RoomsModule } from '../rooms/rooms.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([VaccineRepository]),
    RoomsModule
  ],
  controllers: [VaccinesController],
  providers: [VaccinesService],
  exports: [VaccinesService]
})
export class VaccinesModule {}
