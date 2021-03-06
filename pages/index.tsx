import type { NextPage } from 'next'

import AppHead from '~/components/AppHead'
import Page from '~/components/layout/Page'
import AppBox from '~/ui/AppBox'
import Heading from '~/ui/typography/Heading'
import Text from '~/ui/typography/Text'

const Index: NextPage = () => (
  <Page>
    <AppHead title="Homepage" />
    <Heading as="h1">March Radness</Heading>
    <AppBox mt={2}>
      <Text>April is the cruelest month but March is the Raddest</Text>
    </AppBox>
  </Page>
)

export default Index
