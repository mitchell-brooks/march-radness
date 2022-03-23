import AppBox from '~/ui/AppBox'
import Text from '~/ui/typography/Text'
import { DataTable } from 'grommet'
import type { Player, RoundInfo } from 'lib/airtable'

interface Props {
  team: Player[]
  roundNumber: RoundInfo['roundNumber']
}

export const TeamTable: React.FC<Props> = ({ team, roundNumber }) => {
  const roundString: keyof Player = `pts_${roundNumber}`
  return (
    <AppBox mt={2}>
      <DataTable
        columns={[
          {
            property: 'name',
            header: <Text>Name</Text>,
            render: ({ name }) => <Text>{name}</Text>,
            primary: true,
            pin: true,
          },
          {
            property: 'lg_pts',
            header: <Text>Points</Text>,
            render: ({ lg_pts }) => (
              <Text>
                <strong>{lg_pts}</strong>
              </Text>
            ),
            sortable: true,
          },
          {
            property: 'team',
            header: <Text>Team</Text>,
            render: ({ team }) => <Text>{team}</Text>,
            sortable: true,
          },
          {
            property: 'seed',
            header: <Text>Seed</Text>,
            render: ({ seed }) => <Text>{seed}</Text>,
            sortable: true,
          },
          {
            property: 'pick',
            header: <Text>Pick</Text>,
            render: ({ pick }) => <Text>{pick}</Text>,
            sortable: true,
          },
          {
            property: roundString,
            header: <Text>Pts&nbsp;{roundNumber}</Text>,
            render: player => <Text>{player[roundString]}</Text>,
            sortable: true,
          },
        ]}
        data={team}
      />
    </AppBox>
  )
}
