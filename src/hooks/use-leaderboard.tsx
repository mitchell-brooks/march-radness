import { getLeaderboard, Participant } from 'lib/airtable'
import { useState, useEffect } from 'react'

export default async function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<Participant[] | null>(null)
  useEffect(() => {
    const retrieveLeaderboard = async () => {
      const retrievedLeaderboard = await getLeaderboard()
      setLeaderboard(retrievedLeaderboard)
    }
    retrieveLeaderboard()
  }, [])

  return leaderboard
}
