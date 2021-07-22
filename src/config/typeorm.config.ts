import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { resolve } from 'path'
import { envs } from './envs.config'

export default (): TypeOrmModuleOptions => <TypeOrmModuleOptions>{
  type: 'postgres',
  host: 'db',
  database: envs.dbName,
  username: envs.dbUser,
  password: envs.dbPass,
  entities: [resolve(__dirname, '..', '**', '*.entity{.ts,.js}')],
  synchronize: true,
  logging: true
}
