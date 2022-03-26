import type { GetServerSideProps, NextPage, NextPageContext } from 'next'

import AppHead from '~/components/AppHead'
import Page from '~/components/layout/Page'
import AppBox from '~/ui/AppBox'
import Heading from '~/ui/typography/Heading'
import Text from '~/ui/typography/Text'
import { getUpdateTime, getCurrentRoundInfo, RoundInfo, Player, getTournamentTeam, getHighScorers } from 'lib/airtable'
import { TeamTable } from '~/components/team-table'

interface Props {
  highScorers: Player[]
  updateTime: string
  roundNumber: RoundInfo['roundNumber']
}

const HighScorersPage: NextPage<Props> = ({ highScorers, updateTime, roundNumber }) => {
  console.log(highScorers)
  return (
    <Page>
      <AppHead title="High Scorers" />
      <Heading as="h1">High Scorers</Heading>
      <AppBox as="h6" mb={2}>
        <Text>Last updated {updateTime}</Text>
      </AppBox>
      <AppBox as="section" mb={4}>
        <TeamTable
          team={highScorers}
          roundNumber={roundNumber}
          columns={[
            'name',
            'active',
            'participant',
            'pick',
            'pts_total',
            'pts_64',
            'pts_32',
            'pts_16',
            'pts_8',
            'pts_4',
            'pts_2',
          ]}
        />
      </AppBox>
    </Page>
  )
}

export default HighScorersPage

export const getServerSideProps: GetServerSideProps = async context => {
  let team_name = context?.params?.team_name || ''
  if (Array.isArray(team_name)) {
    team_name = team_name[0]
  }
  team_name = decodeURI(team_name)
  try {
    const updateTime = await getUpdateTime()
    const { roundNumber } = await getCurrentRoundInfo()
    const highScorers = await getHighScorers()
    console.log(':::team', highScorers)
    return {
      props: {
        highScorers,
        updateTime,
        roundNumber,
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
