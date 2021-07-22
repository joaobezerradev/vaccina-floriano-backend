import { config } from 'dotenv'

config()

export const envs = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
  expiresInRefresh: process.env.JWT_SECRET_REFRESHTOKEN_EXPIRES_IN,
  secretRefresh: process.env.JWT_SECRET_REFRESHTOKEN,
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbPass: process.env.DB_PASS
}
