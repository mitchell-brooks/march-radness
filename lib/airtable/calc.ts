import { calcTable } from './connect'
//import { format } from 'date-fns'
import { utcToZonedTime, format } from 'date-fns-tz'
export async function getUpdateTime() {
  const calc = await calcTable.select({ fields: ['thru'] }).firstPage()
  console.log(calc)
  const time = calc[0].fields.thru
  return format(utcToZonedTime(new Date(time as string), 'America/New_York'), 'cccc haa')
}
