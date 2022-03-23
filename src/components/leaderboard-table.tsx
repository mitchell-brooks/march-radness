import AppBox from '~/ui/AppBox'
import Text from '~/ui/typography/Text'
import { DataTable } from 'grommet'
import type { Participant, RoundInfo } from 'lib/airtable'

type Round = '2' | '4' | '8' | '16' | '32' | '64' | 2 | 4 | 8 | 16 | 32 | 64

interface Props {
  leaderboard: Participant[]
  round: RoundInfo['roundNumber']
}

export const LeaderboardTable: React.FC<Props> = ({ leaderboard, round }) => {
  const leftString: keyof Participant = `left_${round}`

  return (
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
            property: 'lg_pts',
            header: <Text>Points</Text>,
            render: ({ lg_pts }) => <Text>{lg_pts}</Text>,
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
            property: 'players_left',
            header: <Text>{round}&nbsp;Left</Text>,
            render: participant => <Text>{participant[leftString]}</Text>,
          },
          {
            property: 'players.players_eliminated',
            header: <Text>Eliminated</Text>,
            render: ({ players_eliminated }) => <Text>{players_eliminated}</Text>,
          },
          {
            property: 'players.players_active',
            header: <Text>Active</Text>,
            render: ({ players_active }) => <Text>{players_active}</Text>,
          },
          {
            property: 'players.players_inactive',
            header: <Text>Inactive</Text>,
            render: ({ players_inactive }) => <Text>{players_inactive}</Text>,
          },
        ]}
        data={leaderboard}
      />
    </AppBox>
  )
}
