export type CreateToken = {
  id: string
  email: string
  name: string
}

export type Token = {
  accessToken?: string
  refreshToken?: string
  name: string
  id: string
  email: string
  avatar?: string
}
