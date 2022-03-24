import AppBox from '~/ui/AppBox'
import Text from '~/ui/typography/Text'

interface Props {
  totalWinnings: number
}

export const WinningsTally: React.FC<Props> = ({ totalWinnings }) => {
  return (
    <AppBox as="section" ml={2} mt={4}>
      <AppBox as="h2" mb={2}>
        <Text>Current Total: ${totalWinnings}</Text>
      </AppBox>
      <AppBox as="h3" mb={2}>
        <Text>Split</Text>
      </AppBox>
      <AppBox as="h4" mb={2}>
        <Text>First Place: ${totalWinnings * 0.7}</Text>
      </AppBox>
      <AppBox as="h5" mb={2}>
        <Text>Second Place: ${totalWinnings * 0.15}</Text>
      </AppBox>
      <AppBox as="h5" mb={2}>
        <Text>Third Place: ${totalWinnings * 0.1}</Text>
      </AppBox>
      <AppBox as="h5" mb={2}>
        <Text>Final Four MVP: ${totalWinnings * 0.05}</Text>
      </AppBox>
    </AppBox>
  )
}
