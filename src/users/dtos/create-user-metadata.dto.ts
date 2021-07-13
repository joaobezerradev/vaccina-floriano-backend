import { UserGender } from '../enums'

export class CreateUserMetadataDto {
  gender: UserGender

  birthDate: Date

  phone: string

  identityCard: string | null

  motherName: string

  healthCard: string | null
}
