import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { resolve } from 'path'

export default (): TypeOrmModuleOptions => <TypeOrmModuleOptions>{
  type: 'sqlite',
  database: resolve(__dirname, '..', '..', 'db.sqlite'),
  entities: [resolve(__dirname, '..', '**', '*.entity{.ts,.js}')],
  synchronize: true,
  logging: true
}
