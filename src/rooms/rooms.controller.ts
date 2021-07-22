import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { RoomsService } from './rooms.service'
import { CreateRoomDto } from './dtos/create-room.dto'
import { RoomEntity } from './room.entity'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'

@Controller('rooms')
@ApiTags('rooms')
@UseGuards(AuthGuard('jwt'))
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
