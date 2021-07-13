import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ComorbidityEntity } from './comorbidity.entity'
import { ComorbidityRepository } from './comorbidity.repository'

@Injectable()
export class ComorbiditiesService {
  constructor (
    @InjectRepository(ComorbidityRepository)
    private comorbidityRepository: ComorbidityRepository
  ) {}

  async createComorbidity (message: string): Promise<ComorbidityEntity> {
    const newComorbidity = this.comorbidityRepository.create({
      message
    })

    return this.comorbidityRepository.save(newComorbidity)
  }

  async findOne (comorbidityId: string): Promise<ComorbidityEntity> {
    const foundComorbidity = await this.comorbidityRepository.findOne({
      where: {
        id: comorbidityId,
        deletedAt: null
      }
    })
    if (!foundComorbidity) {
      throw new NotFoundException(`Comorbidity with ${comorbidityId} not found.`)
    }

    return foundComorbidity
  }

  async find ():Promise<ComorbidityEntity[]> {
    return this.comorbidityRepository.getAllComorbidities()
  }
}
