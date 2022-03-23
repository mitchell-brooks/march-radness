import { getLeaderboard, Participant } from 'lib/airtable/participants'
import type { NextPage, NextPageContext } from 'next'

import AppHead from '~/components/AppHead'
import Page from '~/components/layout/Page'
import AppBox from '~/ui/AppBox'
import Heading from '~/ui/typography/Heading'
import Text from '~/ui/typography/Text'
import { getCurrentRoundInfo, getTotalWinnings, getUpdateTime, RoundInfo } from 'lib/airtable'
import { LeaderboardTable } from '~/components/leaderboard-table'

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
      <AppBox as="section" ml={2} mt={4}>
        <AppBox as="h2" mb={2}>
          <Text>Current Total: ${totalWinnings}</Text>
        </AppBox>
        <AppBox as="h3" mb={2}>
          <Text>Split</Text>
        </AppBox>
        <AppBox as="h4" mb={2}>
          <Text>First Place: ${totalWinnings * 0.7}</Text>
        </AppBox>
        <AppBox as="h5" mb={2}>
          <Text>Second Place: ${totalWinnings * 0.15}</Text>
        </AppBox>
        <AppBox as="h5" mb={2}>
          <Text>Third Place: ${totalWinnings * 0.1}</Text>
        </AppBox>
        <AppBox as="h5" mb={2}>
          <Text>Final Four MVP: ${totalWinnings * 0.05}</Text>
        </AppBox>
      </AppBox>
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
