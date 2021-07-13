import { Controller, Post, Body, Get } from '@nestjs/common'
import { RoomsService } from './rooms.service'
import { CreateRoomDto } from './dto/create-room.dto'
import { RoomEntity } from './room.entity'

@Controller('rooms')
export class RoomsController {
  constructor (private readonly roomsService: RoomsService) {}

  @Get()
  find ():Promise<RoomEntity[]> {
    return this.roomsService.find()
  }

  @Post()
  create (@Body() createRoomDto: CreateRoomDto) :Promise<RoomEntity> {
    return this.roomsService.create(createRoomDto)
  }
}
