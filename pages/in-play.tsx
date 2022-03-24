import type { GetServerSideProps, NextPage, NextPageContext } from 'next'
import { DataTable } from 'grommet'

import AppHead from '~/components/AppHead'
import Page from '~/components/layout/Page'
import AppBox from '~/ui/AppBox'
import Heading from '~/ui/typography/Heading'
import Text from '~/ui/typography/Text'
import {
  getUpdateTime,
  getParticipantTeam,
  getCurrentRoundInfo,
  RoundInfo,
  Player,
  getPlayersInPlay,
} from 'lib/airtable'
import { TeamTable } from '~/components/team-table'

interface Props {
  participant: string
  teams: Record<Player['team'], Player[]>
  updateTime: string
  roundNumber: RoundInfo['roundNumber']
}

interface TeamInPlayTableProps {
  teamName: Player['team']
  team: Player[]
  roundNumber: RoundInfo['roundNumber']
}

const TeamInPlayTable: React.FC<TeamInPlayTableProps> = ({ teamName, team, roundNumber }) => {
  return (
    <>
      <AppBox as="h3">
        <Text>{teamName}</Text>
      </AppBox>
      <AppBox as="section" mb={4}>
        <TeamTable team={team} roundNumber={roundNumber} columns={['name', 'pts_total', 'participant', 'pick']} />
      </AppBox>
    </>
  )
}

const InPlayPage: NextPage<Props> = ({ teams, updateTime, roundNumber }) => {
  console.log(teams)
  const teamTables = Object.entries(teams).map(([teamName, team]) => (
    <TeamInPlayTable key={teamName} teamName={teamName} team={team} roundNumber={roundNumber} />
  ))
  return (
    <Page>
      <AppHead title="Teams in Play" />
      <Heading as="h1">Teams In Play</Heading>
      <AppBox as="h6" ml={1} mb={4}>
        <Text>Last updated {updateTime}</Text>
      </AppBox>
      <AppBox as="div">{teamTables}</AppBox>
    </Page>
  )
}

export default InPlayPage

export const getServerSideProps: GetServerSideProps = async context => {
  let participant_id = context?.params?.participant_id || ''
  if (Array.isArray(participant_id)) {
    participant_id = participant_id[0]
  }
  try {
    const updateTime = await getUpdateTime()
    const { roundNumber, dayNumber } = await getCurrentRoundInfo()
    const teamsInPlay = await getPlayersInPlay(roundNumber, dayNumber)
    console.log(teamsInPlay)
    return {
      props: {
        teams: teamsInPlay,
        participant: participant_id,
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
