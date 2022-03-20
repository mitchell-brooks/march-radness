import { getLeaderboard, Participant } from 'lib/airtable/participants'
import type { NextPage, NextPageContext } from 'next'
import { DataTable } from 'grommet'

import AppHead from '~/components/AppHead'
import Page from '~/components/layout/Page'
import useLeaderboard from '~/hooks/use-leaderboard'
import AppBox from '~/ui/AppBox'
import Heading from '~/ui/typography/Heading'
import Text from '~/ui/typography/Text'
import { getUpdateTime } from 'lib/airtable'

interface Props {
  leaderboard: Participant[]
  updateTime: string
}

const Leaderboard: NextPage<Props> = ({ leaderboard, updateTime }) => {
  console.log(updateTime)
  return (
    <Page>
      <AppHead title="Homepage" />
      <Heading as="h1">Leaderboard</Heading>
      <AppBox as="h6" ml={1}>
        <Text>Last updated {updateTime}</Text>
      </AppBox>
      <AppBox mt={2}>
        <DataTable
          columns={[
            {
              property: 'name',
              header: <Text>Name</Text>,
              render: ({ name }) => <Text>{name[0].toUpperCase() + name.slice(1)}</Text>,
              primary: true,
            },
            {
              property: 'pts.lg_pts',
              header: <Text>Points</Text>,
              render: ({ pts: { lg_pts } }) => <Text>{lg_pts}</Text>,
            },
            { property: 'pt_diff', header: <Text>Trailing</Text>, render: ({ pt_diff }) => <Text>{pt_diff}</Text> },
            {
              property: 'owes',
              header: <Text>Owes</Text>,
              render: ({ owes }) => (
                <Text color={Number(owes) < 0 ? 'red' : 'black'}>{`$${Number(owes).toFixed(2)}`}</Text>
              ),
            },
            {
              property: 'players.players_eliminated',
              header: <Text>Eliminated</Text>,
              render: ({ players: { players_eliminated } }) => <Text>{players_eliminated}</Text>,
            },
            {
              property: 'players.players_active',
              header: <Text>Active</Text>,
              render: ({ players: { players_active } }) => <Text>{players_active}</Text>,
            },
            {
              property: 'players.players_inactive',
              header: <Text>Inactive</Text>,
              render: ({ players: { players_inactive } }) => <Text>{players_inactive}</Text>,
            },
          ]}
          data={leaderboard}
        />
      </AppBox>
    </Page>
  )
}

export default Leaderboard

export async function getServerSideProps(context: NextPageContext) {
  try {
    const leaderboard = await getLeaderboard()
    const updateTime = await getUpdateTime()
    return {
      props: {
        leaderboard,
        updateTime,
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
