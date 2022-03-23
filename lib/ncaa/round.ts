import { format, utcToZonedTime } from 'date-fns-tz'

// not sure that I actually need any of this, leaving for now

const ROUND_64 = 'ROUND_64'
const ROUND_32 = 'ROUND_32'
const ROUND_16 = 'ROUND_16'
const ROUND_8 = 'ROUND_8'
const ROUND_4 = 'ROUND_4'
const ROUND_2 = 'ROUND_2'

const DAY_1 = 'DAY_1'
const DAY_2 = 'DAY_2'

const TIME_ZONE = 'America/New_York'
const START_16 = utcToZonedTime(new Date(2022, 3, 24, 12), TIME_ZONE)
const END_16 = utcToZonedTime(new Date(2022, 3, 26, 1), TIME_ZONE)

const START_8 = utcToZonedTime(new Date(2022, 3, 26, 9), TIME_ZONE)
const END_8 = utcToZonedTime(new Date(2022, 3, 27, 11, 59), TIME_ZONE)

const START_4 = utcToZonedTime(new Date(2022, 4, 2, 9), TIME_ZONE)
const END_4 = utcToZonedTime(new Date(2022, 4, 2, 23, 59), TIME_ZONE)

const START_2 = utcToZonedTime(new Date(2022, 4, 4, 17), TIME_ZONE)
const END_2 = utcToZonedTime(new Date(2022, 4, 4, 23, 59), TIME_ZONE)
