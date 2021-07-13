import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { UserEntity } from './user.entity'

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Get()
  getAll () :Promise<UserEntity[]> {
    return this.usersService.getAll()
  }

  @Post()
  create (@Body() createUserDto: CreateUserDto) :Promise<UserEntity> {
    return this.usersService.create(createUserDto)
  }
}
