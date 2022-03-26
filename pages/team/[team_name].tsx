import type { GetServerSideProps, NextPage, NextPageContext } from 'next'

import AppHead from '~/components/AppHead'
import Page from '~/components/layout/Page'
import AppBox from '~/ui/AppBox'
import Heading from '~/ui/typography/Heading'
import Text from '~/ui/typography/Text'
import { getUpdateTime, getCurrentRoundInfo, RoundInfo, Player, getTournamentTeam } from 'lib/airtable'
import { TeamTable } from '~/components/team-table'

interface Props {
  team_name: string
  team: Player[]
  updateTime: string
  roundNumber: RoundInfo['roundNumber']
}

const TeamPage: NextPage<Props> = ({ team_name, updateTime, team, roundNumber }) => {
  console.log(team)
  return (
    <Page>
      <AppHead title={team_name} />
      <Heading as="h1">{team_name}</Heading>
      <AppBox as="h3">
        <Text>{`${team[0].seed} seed in ${team[0].region}`}</Text>
      </AppBox>
      <AppBox as="h6" mb={2}>
        <Text>{team[0].active[0] === 'Yes' ? 'Still alive' : 'Eliminated'}</Text>
      </AppBox>
      <AppBox as="section" mb={4}>
        <TeamTable
          team={team}
          roundNumber={roundNumber}
          columns={[
            'name',
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

export default TeamPage

export const getServerSideProps: GetServerSideProps = async context => {
  let team_name = context?.params?.team_name || ''
  if (Array.isArray(team_name)) {
    team_name = team_name[0]
  }
  team_name = decodeURI(team_name)
  try {
    const updateTime = await getUpdateTime()
    const { roundNumber } = await getCurrentRoundInfo()
    const team = await getTournamentTeam(team_name)
    console.log(':::team', team)
    return {
      props: {
        team_name,
        team,
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
