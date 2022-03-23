import { calcTable, gamesTable, getRecord } from './connect'
import { utcToZonedTime, format } from 'date-fns-tz'

export interface RoundInfo {
  round: string
  date: string
  teams_link: string[]
  calc: string[]
  teams: string[]
  roundNumber: '2' | '4' | '8' | '16' | '32' | '64' | 2 | 4 | 8 | 16 | 32 | 64
  dayNumber: '1' | '2' | 1 | 2
}

export async function getUpdateTime() {
  const calc = await calcTable.select({ fields: ['thru'] }).firstPage()
  console.log(calc)
  const time = calc[0].fields.thru
  return format(utcToZonedTime(new Date(time as string), 'America/New_York'), 'cccc haa')
}

export async function getTotalWinnings() {
  const calc = await calcTable.select({ fields: ['total_winnings'] }).firstPage()
  console.log(calc)
  const total = calc[0].fields.total_winnings
  const numTotal = Number(total).toFixed(2)
  return numTotal
}

export async function getCurrentRoundInfo(): Promise<RoundInfo> {
  const calc = await calcTable.select({ fields: ['current_round_link'] }).firstPage()
  console.log(':::calc', calc)
  const { current_round_link } = calc[0].fields
  console.log(':::current_round', current_round_link)
  let record
  if (Array.isArray(current_round_link)) {
    record = current_round_link[0]
  } else {
    record = current_round_link
  }
  console.log()
  const round = await gamesTable.find(record)
  const currentRound = round.fields

  const current_round = currentRound.round as string
  const [roundNumber, dayNumber] = current_round.split('_')
  currentRound.roundNumber = roundNumber
  currentRound.dayNumber = dayNumber
  return currentRound as unknown as RoundInfo
}
