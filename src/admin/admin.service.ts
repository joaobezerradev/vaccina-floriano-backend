import { Injectable } from '@nestjs/common'
import { RoomEntity } from '../rooms/room.entity'
import { RoomsService } from '../rooms/rooms.service'
import { UserEntity } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { VaccineEntity } from '../vaccines/vaccine.entity'
import { VaccinesService } from '../vaccines/vaccines.service'
import { AdminCreateRoomDto } from './dtos/admin-create-room.dto'
import { AdminStoreVaccinesDto } from './dtos/admin-store-vaccines.dto'

@Injectable()
export class AdminService {
  constructor (
    private readonly roomsService: RoomsService,
    private readonly vaccinesService: VaccinesService,
    private readonly usersService: UsersService
  ) { }

  async createRoom (adminCreateRoom: AdminCreateRoomDto): Promise<RoomEntity> {
    return this.roomsService.create({ ...adminCreateRoom })
  }

  async storeVaccines (adminStoreVaccines: AdminStoreVaccinesDto): Promise<void> {
    return this.vaccinesService.create({ ...adminStoreVaccines })
  }

  async getCommonUsers (): Promise<UserEntity[]> {
    return this.usersService.getCommonUsers()
  }

  async setCommonUserAsVaccinated (personPhysicalCard: string): Promise<VaccineEntity> {
    return this.vaccinesService.setCommonUserAsVaccinated(personPhysicalCard)
  }
}
