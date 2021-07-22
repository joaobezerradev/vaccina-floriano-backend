import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from '../commons/decorators/roles.decorator'
import { RoomEntity } from '../rooms/room.entity'
import { UserEntity } from '../users/user.entity'
import { VaccineEntity } from '../vaccines/vaccine.entity'
import { AdminService } from './admin.service'

import { AdminCreateRoomDto } from './dtos/admin-create-room.dto'
import { AdminStoreVaccinesDto } from './dtos/admin-store-vaccines.dto'

@Controller('admin')
@ApiTags('admin')
@UseGuards(AuthGuard('jwt'))
@Roles('ADMIN')
export class AdminController {
  constructor (private readonly adminService: AdminService) { }

  @Post('/rooms')
  async createRoom (@Body() adminCreateRoom: AdminCreateRoomDto): Promise<RoomEntity> {
    return this.adminService.createRoom(adminCreateRoom)
  }

  @Post('/vaccines')
  async storeVaccines (@Body() adminStoreVaccines: AdminStoreVaccinesDto): Promise<void> {
    return this.adminService.storeVaccines(adminStoreVaccines)
  }

  @Get('/users')
  async getCommonUsers (): Promise<UserEntity[]> {
    return this.adminService.getCommonUsers()
  }

  @Post('/users/:personPhysicalCard')
  async setCommonUserAsVaccinated (@Param('personPhysicalCard') personPhysicalCard: string): Promise<VaccineEntity> {
    return this.adminService.setCommonUserAsVaccinated(personPhysicalCard)
  }
}
