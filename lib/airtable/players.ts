import type { FieldSet } from 'airtable'
import { playersTable } from './connect'

function mapTeamPlayers(playerResponse: any): FieldSet {
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
