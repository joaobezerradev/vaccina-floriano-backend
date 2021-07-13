import { ShiftEnum } from '../enums/shift.enum'

export class CreateRoomDto {
  name: string

  street: string

  neighborhood: string

  shift: ShiftEnum
}
