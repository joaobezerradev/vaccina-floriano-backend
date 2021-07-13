import { Request } from 'express'
import { UserEntity } from '../users/user.entity'

export type RequestWithUser = Request & { user: UserEntity }
