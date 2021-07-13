import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PriorityGroupRepository } from './priority-group.repository'
import { PriorityGroupsController } from './priority-groups.controller'
import { PriorityGroupsService } from './priority-groups.service'

@Module({
  imports: [TypeOrmModule.forFeature([PriorityGroupRepository])],
  controllers: [PriorityGroupsController],
  providers: [PriorityGroupsService],
  exports: [PriorityGroupsService]
})
export class PriorityGroupsModule {}
