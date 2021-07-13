import { CreateUserAddressDto } from './create-user-address.dto'
import { CreateUserMetadataDto } from './create-user-metadata.dto'

export class CreateUserDto {
  name: string

  email: string

  personPhysicalCard: string

  password: string

  metadata: CreateUserMetadataDto

  address: CreateUserAddressDto
}
