import type { FieldSet } from 'airtable'
import { gamesTable, playersTable } from './connect'

function mapTeamPlayers(playerResponse: any): FieldSet & Player {
  return playerResponse.fields
}

export interface Player {
  ppg: number
  active: string[]
  games_played: number
  games_played_tournament: number
  height: string
  lg_pts: number
  lg_pts_32: number
  lg_pts_64: number
  name: string
  participant: string
  participant_link: string[]
  pick: number
  player_id: string
  player_projections_link: string[]
  ppg_thru_32: number
  ppg_tournament: number
  proj_total_points_original: number[]
  pts_64: number
  pts_32: number
  pts_16: number
  pts_8: number
  pts_4: number
  pts_2: number
  pts_total: number
  rd: string
  region: string[]
  season_pts: number
  seed: number[]
  team: string
  team_link: string[]
}

export async function getParticipantTeam(participant: string) {
  const activePlayers = await playersTable
    .select({
      filterByFormula: `AND(participant = "${participant}",FIND("Yes", active))`,
      sort: [{ field: 'lg_pts', direction: 'desc' }],
    })
    .firstPage()

  const eliminatedPlayers = await playersTable
    .select({
      filterByFormula: `AND(participant = "${participant}",FIND("No", active))`,
      sort: [{ field: 'lg_pts', direction: 'desc' }],
    })
    .firstPage()

  const active = activePlayers.map(playerResponse => mapTeamPlayers(playerResponse))
  const eliminated = eliminatedPlayers.map(playerResponse => mapTeamPlayers(playerResponse))

  return { active, eliminated }
}

export async function getPlayersInPlay(roundNumber: number | string, dayNumber: number | string | undefined) {
  let round = roundNumber.toString()
  if (round.indexOf('_') === -1) {
    round = `${round}_${dayNumber}`
  }
  const res = await gamesTable.select({ fields: ['teams'], filterByFormula: `round = "${round}"` }).firstPage()
  const teamsArray = (res[0].fields.teams as []) || []
  const teamStrings = teamsArray.map(str => `team = "${str}"`)
  const query = 'OR(' + teamStrings.join(',') + ')'
  console.log(query)
  const playersRes = await playersTable
    .select({
      filterByFormula: query,
      sort: [
        { field: 'team', direction: 'asc' },
        { field: 'lg_pts', direction: 'desc' },
        { field: 'pts_total', direction: 'desc' },
      ],
    })
    .all()
  const playersInPlay: Player[] = playersRes.map(player => mapTeamPlayers(player))
  console.log(playersInPlay)
  const teamsDict: Record<Player['team'], Player[]> = {}
  for (const player of playersInPlay) {
    const { team } = player
    if (!(team in teamsDict)) {
      teamsDict[team] = []
    }
    teamsDict[team].push(player)
  }
  return teamsDict
}
