import { calcTable } from './connect'
import { format } from 'date-fns'

export async function getUpdateTime() {
  const calc = await calcTable.select({ fields: ['thru'] }).firstPage()
  console.log(calc)
  const time = calc[0].fields.thru
  return format(new Date(time as string), 'cccc haa')
}
