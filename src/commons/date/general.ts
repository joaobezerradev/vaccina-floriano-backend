import { tz } from 'moment-timezone'
import { BRAZIL_TIMEZONE } from './constants'
import * as moment from 'moment'

export const endOfDayInBrazil = (date?: Date | string): string => {
  const dateInBrazil = tz(date || new Date(), BRAZIL_TIMEZONE)
  return dateInBrazil.endOf('day').format()
}

export const startOfDayInBrazil = (date?: Date | string): string => {
  const dateInBrazil = tz(date || new Date(), BRAZIL_TIMEZONE)
  return dateInBrazil.startOf('day').format()
}

export const toISOStringInBrazil = (date?: Date | string): string => {
  return tz(date || new Date(), BRAZIL_TIMEZONE).format()
}

export const setHoursInDay = (date: Date | string, hour: number): string => {
  return moment(date).set('hour', hour).format()
}

export const getUTCTimestamp = (): string => {
  return moment().utc().format()
}
