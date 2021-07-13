import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoomsService } from '../rooms/rooms.service'
import { CreateVaccineDto } from './dto/create-vaccine.dto'
import { VaccineEntity } from './vaccine.entity'
import { VaccineRepository } from './vaccine.repository'
import { setHours } from 'date-fns'
import { VaccineHour } from './enums/vaccine-hour.enum'
import { MoreThanOrEqual } from 'typeorm'

@Injectable()
export class VaccinesService {
  constructor (
    @InjectRepository(VaccineRepository)
    private readonly vaccineRepository: VaccineRepository,
    private readonly roomsService: RoomsService
  ) { }

  async create (createVaccineDto: CreateVaccineDto): Promise<void> {
    const { amount, roomId } = createVaccineDto
    if (!amount || amount < 1 || amount > 210) throw new UnprocessableEntityException('Vaccines amount not processable')
    await this.roomsService.findOne(roomId)
    await this.handleVaccinesAmountTime(createVaccineDto)
  }

  private async handleVaccinesAmountTime (createVaccineDto: CreateVaccineDto): Promise<void> {
    const { amount } = createVaccineDto

    if (amount > 190) {
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h9, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h10, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h11, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h13, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h14, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h15, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h16, amount - 190)
    } else if (amount > 150) {
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h9, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h10, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h11, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h13, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h14, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h15, amount - 150)
    } else if (amount > 120) {
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h9, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h10, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h11, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h13, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h14, amount - 120)
    } else if (amount > 90) {
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h9, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h10, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h11, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h13, amount - 90)
    } else if (amount > 60) {
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h9, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h10, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h11, amount - 60)
    } else if (amount > 30) {
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h9, 30)
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h10, amount - 30)
    } else {
      await this.createVaccines({ ...createVaccineDto }, VaccineHour.h9, amount)
    }
  }

  private async createVaccines (createVaccineDto: Omit<CreateVaccineDto, 'amount'>, vaccineHour: VaccineHour, amount: number): Promise<void> {
    const { batch, day, name, note, roomId } = createVaccineDto
    const vaccines: VaccineEntity[] = []
    const newDate = setHours(new Date(day), Number(vaccineHour))
    for (let i = 1; i <= amount; i++) {
      const vaccine = this.vaccineRepository.create({
        day: newDate,
        name,
        batch,
        note,
        roomId
      })
      vaccines.push(vaccine)
    }
    await this.vaccineRepository.save(vaccines)
  }

  async findByRoom (roomId: string, appointmentDate: Date): Promise<VaccineEntity[]> {
    const foundVaccines = await this.vaccineRepository.find({
      where: {
        deletedAt: null,
        applyAt: null,
        roomId,
        day: MoreThanOrEqual(appointmentDate)
      }
    })

    if (!foundVaccines) throw new NotFoundException('Vaccines not found.')

    return foundVaccines
  }

  async find (): Promise<VaccineEntity[]> {
    return this.vaccineRepository.find({ where: { deletedAt: null } })
  }

  async save (vaccine:VaccineEntity):Promise<VaccineEntity> {
    return this.vaccineRepository.save(vaccine)
  }
}
