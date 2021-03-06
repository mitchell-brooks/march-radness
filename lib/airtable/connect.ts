// const Airtable = require('airtable')
import Airtable from 'airtable'

// Authenticate
Airtable.configure({
  apiKey: process.env.AIRTABLE_TOKEN,
})

// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID as string)

// Reference a table
const playersTable = base(process.env.PLAYERS_TABLE_ID as string)
const participantsTable = base(process.env.PARTICIPANTS_TABLE_ID as string)
const teamsTable = base(process.env.TEAMS_TABLE_ID as string)
const calcTable = base(process.env.CALC_TABLE_ID as string)
const gamesTable = base(process.env.GAMES_TABLE_ID as string)

function getRecord(record: string) {
  return base(record)
}

export { getRecord, playersTable, participantsTable, teamsTable, calcTable, gamesTable }
