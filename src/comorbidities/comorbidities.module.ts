import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ComorbiditiesService } from './comorbidities.service'
import { ComorbiditiesController } from './comorbidities.controller'
import { ComorbidityRepository } from './comorbidity.repository'

@Module({
  imports: [TypeOrmModule.forFeature([ComorbidityRepository])],
  controllers: [ComorbiditiesController],
  providers: [ComorbiditiesService],
  exports: [ComorbiditiesService]
})
export class ComorbiditiesModule {}
