import type Airtable from 'airtable'
import { participantsTable } from '.'

export type Participant = {
  name: string
  participant: string
  draft_order: number
  lg_pts: number
  lg_high_score: number
  pt_diff: number
  owes: string
  pts_64: number
  pts_32: number
  pts_16: number
  pts_8: number
  pts_4: number
  pts_2: number
  pts_total: number
  all_players: string[]
  players_active: number
  players_eliminated: number
  players_inactive: number
  active_players: string[]
  eliminated_players: string[]
  left_64: number
  left_32: number
  left_16: number
  left_8: number
  left_4: number
  left_2: number
}

//export async function getParticipant(name: string): Promise<Participant> {
//const participant = await participantsTable.select({ filterByFormula: [{ field: 'participant', equals: name }] })
//}

function mapParticipant(rawParticipant: any) {
  const {
    participant,
    players,
    lg_pts,
    draft_order,
    pts_64,
    pts_32,
    pts_16,
    pts_8,
    pts_4,
    pts_2,
    pts_total,
    players_active,
    players_eliminated,
    players_inactive,
    active_players,
    eliminated_players,
    left_64,
    left_32,
    left_16,
    left_8,
    left_4,
    left_2,
    lg_high_score,
    pt_diff,
    owes,
  } = rawParticipant.fields
  return {
    name: participant,
    participant,
    draft_order,
    lg_pts,
    lg_high_score,
    pt_diff,
    owes,
    pts_64,
    pts_32,
    pts_16,
    pts_8,
    pts_4,
    pts_2,
    pts_total,
    all_players: players,
    players_active,
    players_eliminated,
    players_inactive,
    active_players,
    eliminated_players,
    left_64,
    left_32,
    left_16,
    left_8,
    left_4,
    left_2,
  } as Participant
}

export async function getLeaderboard(): Promise<Participant[]> {
  const sortedTable = await participantsTable.select({ sort: [{ field: 'lg_pts', direction: 'desc' }] }).firstPage()
  const handledTable: Participant[] = sortedTable.map(rawParticipant => mapParticipant(rawParticipant))
  return handledTable
}
