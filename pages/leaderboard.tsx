import { getLeaderboard, Participant } from 'lib/airtable/participants'
import type { NextPage, NextPageContext } from 'next'

import AppHead from '~/components/AppHead'
import Page from '~/components/layout/Page'
import AppBox from '~/ui/AppBox'
import Heading from '~/ui/typography/Heading'
import Text from '~/ui/typography/Text'
import { getCurrentRoundInfo, getUpdateTime, RoundInfo } from 'lib/airtable'
import { LeaderboardTable } from '~/components/leaderboard-table'

interface Props {
  leaderboard: Participant[]
  updateTime: string
  currentRound: RoundInfo
}

const LeaderboardPage: NextPage<Props> = ({ leaderboard, updateTime, currentRound }) => {
  const { roundNumber } = currentRound
  return (
    <Page>
      <AppHead title="Homepage" />
      <Heading as="h1">Leaderboard</Heading>
      <AppBox as="h6" ml={1}>
        <Text>Last updated {updateTime}</Text>
      </AppBox>
      <LeaderboardTable leaderboard={leaderboard} roundNumber={roundNumber} />
    </Page>
  )
}

export default LeaderboardPage

export async function getServerSideProps(context: NextPageContext) {
  try {
    const leaderboard = await getLeaderboard()
    const updateTime = await getUpdateTime()
    const currentRound = await getCurrentRoundInfo()
    return {
      props: {
        leaderboard,
        updateTime,
        currentRound,
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
