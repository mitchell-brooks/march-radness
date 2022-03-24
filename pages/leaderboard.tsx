import { getLeaderboard, Participant } from 'lib/airtable/participants'
import type { NextPage, NextPageContext } from 'next'

import AppHead from '~/components/AppHead'
import Page from '~/components/layout/Page'
import AppBox from '~/ui/AppBox'
import Heading from '~/ui/typography/Heading'
import Text from '~/ui/typography/Text'
import { getCurrentRoundInfo, getTotalWinnings, getUpdateTime, RoundInfo } from 'lib/airtable'
import { LeaderboardTable } from '~/components/leaderboard-table'
import { WinningsTally } from '~/components/winnings-tally'

interface Props {
  leaderboard: Participant[]
  updateTime: string
  currentRound: RoundInfo
  totalWinnings: number
}

const LeaderboardPage: NextPage<Props> = ({ leaderboard, updateTime, currentRound, totalWinnings }) => {
  const { roundNumber } = currentRound
  return (
    <Page>
      <AppHead title="Leaderboard" />
      <Heading as="h1">Leaderboard</Heading>
      <AppBox as="h6" ml={1} mb={2}>
        <Text>Last updated {updateTime}</Text>
      </AppBox>
      <AppBox as="section" mb={2}>
        <LeaderboardTable leaderboard={leaderboard} roundNumber={roundNumber} />
      </AppBox>
      <WinningsTally totalWinnings={totalWinnings} />
    </Page>
  )
}

export default LeaderboardPage

export async function getServerSideProps(context: NextPageContext) {
  try {
    const leaderboard = await getLeaderboard()
    const updateTime = await getUpdateTime()
    const currentRound = await getCurrentRoundInfo()
    const totalWinnings = await getTotalWinnings()
    return {
      props: {
        leaderboard,
        updateTime,
        currentRound,
        totalWinnings,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        err: 'Oops, something went wrong',
      },
    }
  }
}
