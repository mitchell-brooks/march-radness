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
  const roundString: keyof Player = `pts_${roundNumber}`
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
      render: ({ team }) => <Text>{team}</Text>,
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
      render: ({ pick }) => <Text>{pick}</Text>,
      sortable: true,
    },
    participant: {
      property: 'participant',
      header: <Text>Drafted&nbsp;by</Text>,
      render: ({ participant }) => (
        <Text>
          {participant && (
            <Link href={`/participant/${participant}`}>{participant[0].toUpperCase() + participant.slice(1)}</Link>
          )}
        </Text>
      ),
    },
    [roundString]: {
      property: roundString,
      header: <Text>Pts&nbsp;{roundNumber}</Text>,
      render: (player: Player) => <Text>{player[roundString]}</Text>,
      sortable: true,
    },
  }

  const dataTableColumns: DataTableProps<Player>['columns'] = [
    {
      property: 'name',
      header: <Text>Name</Text>,
      render: ({ name }) => <Text>{name}</Text>,
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
    const roundLeft = columnsDict[roundString]
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
        <DataTable columns={dataTableColumns} data={team} />
      </AppBox>
    </>
  )
}
