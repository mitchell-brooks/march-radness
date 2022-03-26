import type { GetServerSideProps, NextPage, NextPageContext } from 'next'

import AppHead from '~/components/AppHead'
import Page from '~/components/layout/Page'
import AppBox from '~/ui/AppBox'
import Heading from '~/ui/typography/Heading'
import Text from '~/ui/typography/Text'
import { getUpdateTime, getParticipantTeam, getCurrentRoundInfo, RoundInfo, Player } from 'lib/airtable'
import { TeamTable } from '~/components/team-table'

interface Props {
  participant: string
  team: { active: Player[]; eliminated: Player[] }
  updateTime: string
  roundNumber: RoundInfo['roundNumber']
}

const ParticipantPage: NextPage<Props> = ({ participant, updateTime, team, roundNumber }) => {
  console.log(team)
  const { active, eliminated } = team
  return (
    <Page>
      <AppHead title={participant} />
      <Heading as="h1">{participant[0].toUpperCase() + participant.slice(1)}</Heading>
      <AppBox as="h6" ml={1} mb={4}>
        <Text>Last updated {updateTime}</Text>
      </AppBox>
      <AppBox as="h3">
        <Text>Active Players</Text>
      </AppBox>
      <AppBox as="section" mb={4}>
        <TeamTable
          team={active}
          roundNumber={roundNumber}
          columns={['name', 'lg_pts', 'team', 'seed', 'pick']}
          leftInRound={true}
        />
      </AppBox>
      <AppBox as="h3">
        <Text>Eliminated Players</Text>
      </AppBox>
      <AppBox as="section">
        <TeamTable team={eliminated} roundNumber={roundNumber} columns={['name', 'lg_pts', 'team', 'seed', 'pick']} />
      </AppBox>
    </Page>
  )
}

export default ParticipantPage

export const getServerSideProps: GetServerSideProps = async context => {
  let participant_id = context?.params?.participant_id || ''
  if (Array.isArray(participant_id)) {
    participant_id = participant_id[0]
  }
  try {
    const updateTime = await getUpdateTime()
    const { roundNumber } = await getCurrentRoundInfo()
    const { active, eliminated } = await getParticipantTeam(participant_id)
    return {
      props: {
        team: {
          active,
          eliminated,
        },
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
