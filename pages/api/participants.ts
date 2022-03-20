import type { NextApiRequest, NextApiResponse } from 'next'
import { getLeaderboard } from '../../lib/airtable'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const leaderboard = await getLeaderboard()
    res.status(200).json(leaderboard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong! 😕' })
  }
}
