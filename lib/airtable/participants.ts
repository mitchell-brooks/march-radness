import { participantsTable } from '.'

export type Participant = {
  name: string
  draft_order: number
  lg_pts: number
  lg_high_score: number
  pt_diff: number
  owes: string
  pts: {
    pts_64: number
    pts_32: number
    pts_16: number
    pts_8: number
    pts_4: number
    pts_2: number
    pts_total: number
    lg_pts: number
  }
  players: {
    all_players: string[]
    players_active: number
    players_eliminated: number
    players_inactive: number
    active_players: string[]
    eliminated_players: string[]
    remaining_by_round: {
      left64: number
      left32: number
      left16: number
      left8: number
      left4: number
      left2: number
    }
  }
}

export async function getLeaderboard(): Promise<Participant[]> {
  const sortedTable = await participantsTable.select({ sort: [{ field: 'lg_pts', direction: 'desc' }] }).firstPage()
  const handledTable: Participant[] = sortedTable.map(participantEntry => {
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
      '64_left': left64,
      '32_left': left32,
      '16_left': left16,
      '8_left': left8,
      '4_left': left4,
      '2_left': left2,
      lg_high_score: lg_high_score,
      pt_diff,
      owes,
    } = participantEntry.fields
    return {
      name: participant,
      draft_order,
      lg_pts,
      lg_high_score,
      pt_diff,
      owes,
      pts: {
        pts_64,
        pts_32,
        pts_16,
        pts_8,
        pts_4,
        pts_2,
        pts_total,
        lg_pts,
      },
      players: {
        all_players: players,
        players_active,
        players_eliminated,
        players_inactive,
        active_players,
        eliminated_players,
        remaining_by_round: { left64, left32, left16, left8, left4, left2 },
      },
    } as Participant
  })
  return handledTable
}
