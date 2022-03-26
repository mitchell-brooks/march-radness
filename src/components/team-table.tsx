import AppBox from '~/ui/AppBox'
import Text from '~/ui/typography/Text'
import { ColumnConfig, DataTable, DataTableProps } from 'grommet'
import type { Player, RoundInfo } from 'lib/airtable'
import Link from 'next/link'

interface Props {
  team: Player[]
  roundNumber: RoundInfo['roundNumber']
  tableTitle?: string
  columns: Array<keyof Player>
  leftInRound?: boolean
}

type ColumnsDict = {
  [Property in keyof Player]?: ColumnConfig<Player>
}

export const TeamTable: React.FC<Props> = ({ team, roundNumber, tableTitle, columns, leftInRound = false }) => {
  const rounds: Array<RoundInfo['roundNumber']> = ['64', '32', '16', '8', '4', '2']
  const generateRoundString = (roundNumber: RoundInfo['roundNumber']): keyof Player => `pts_${roundNumber}`
  const currentRound = generateRoundString(roundNumber)
  const columnsDict: ColumnsDict = {
    lg_pts: {
      property: 'lg_pts',
      header: <Text>Points</Text>,
      render: ({ lg_pts }) => (
        <Text>
          <strong>{lg_pts}</strong>
        </Text>
      ),
      sortable: true,
    },
    pts_total: {
      property: 'pts_total',
      header: <Text>Points</Text>,
      render: ({ pts_total }) => (
        <Text>
          <strong>{pts_total}</strong>
        </Text>
      ),
      sortable: true,
    },
    team: {
      property: 'team',
      header: <Text>Team</Text>,
      render: ({ team }) => {
        const teamURI = encodeURI(team)
        return (
          <Text>
            <Link href={`/team/${teamURI}`}>{team}</Link>
          </Text>
        )
      },
      sortable: true,
    },
    seed: {
      property: 'seed',
      header: <Text>Seed</Text>,
      render: ({ seed }) => <Text>{seed}</Text>,
      sortable: true,
    },
    pick: {
      property: 'pick',
      header: <Text>Pick</Text>,
      render: ({ pick }) => <Text>{pick ? pick : <small>N/A</small>}</Text>,
      sortable: true,
    },
    active: {
      property: 'active',
      header: <Text>Still&nbsp;Alive</Text>,
      render: ({ active }) => <Text>{active}</Text>,
      sortable: true,
    },
    participant: {
      property: 'participant',
      header: <Text>Drafted&nbsp;by</Text>,
      render: ({ participant }) => (
        <Text>
          {participant ? (
            <Link href={`/participant/${participant}`}>{participant[0].toUpperCase() + participant.slice(1)}</Link>
          ) : (
            <small>Undrafted</small>
          )}
        </Text>
      ),
    },
  }

  rounds.forEach(round => {
    const roundString = generateRoundString(round)
    columnsDict[roundString] = {
      property: roundString,
      header: <Text>Pts&nbsp;{round}</Text>,
      render: (player: Player) => (
        <Text>
          {player[roundString] ? player[roundString] : player.active[0] === 'Yes' ? player[roundString] : '0'}
        </Text>
      ),
      sortable: true,
    }
  })

  const dataTableColumns: DataTableProps<Player>['columns'] = [
    {
      property: 'name',
      header: <Text>Name</Text>,
      render: ({ name, team }) => (
        <Text>
          <Link href={`/team/${encodeURI(team)}`}>{name}</Link>
        </Text>
      ),
      primary: true,
      pin: true,
    },
  ]

  columns.forEach(column => {
    const prescribedColumn = columnsDict[column]
    if (prescribedColumn) {
      dataTableColumns.push(prescribedColumn)
    }
  })

  if (leftInRound) {
    const roundLeft = columnsDict[currentRound]
    if (roundLeft) {
      dataTableColumns.push(roundLeft)
    }
  }

  return (
    <>
      {tableTitle && (
        <AppBox as="h4">
          <Text>{tableTitle}</Text>
        </AppBox>
      )}
      <AppBox mt={2}>
        <DataTable
          background={{ header: 'white', body: ['light-2', 'white'] }}
          a11yTitle="Player statistics table"
          columns={dataTableColumns}
          data={team}
        />
      </AppBox>
    </>
  )
}
