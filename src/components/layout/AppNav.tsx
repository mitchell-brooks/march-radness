import React from 'react'

import AppBox from '~/ui/AppBox'
import AppLink from '~/ui/typography/AppLink'

const AppNav: React.FC = () => (
  <AppBox as="nav" p={4}>
    <AppBox as="ul" display="flex">
      <AppBox as="li" marginRight={2}>
        <AppLink href="/leaderboard">Leaderboard</AppLink>
      </AppBox>
    </AppBox>
  </AppBox>
)

export default AppNav
