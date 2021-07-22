import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateRoomDto } from './dtos/create-room.dto'
import { RoomEntity } from './room.entity'
import { RoomRepository } from './room.repository'

@Injectable()
export class RoomsService {
  constructor (
    @InjectRepository(RoomRepository)
    private readonly roomRepository: RoomRepository
  ) {}

  async create (createRoomDto: CreateRoomDto):Promise<RoomEntity> {
    const { name } = createRoomDto

    const foundRoom = await this.roomRepository.findOne({
      where: {
        name,
        deletedAt: null
      }
    })

    if (foundRoom) {
      throw new ConflictException(
        `Room ${name} already exists.`
      )
    }

    const room = this.roomRepository.create(createRoomDto)

    return this.roomRepository.save(room)
  }

  async findOne (roomId: string): Promise<RoomEntity> {
    const foundRoom = await this.roomRepository.findOne({
      where: {
        id: roomId,
        deletedAt: null
      }
    })

    if (!foundRoom) throw new NotFoundException(`Room ${roomId} was not found.`)

    return foundRoom
  }

  async find ():Promise<RoomEntity[]> {
    return this.roomRepository.find()
  }
}
