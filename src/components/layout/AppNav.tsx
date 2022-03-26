import React from 'react'

import AppBox from '~/ui/AppBox'
import AppLink from '~/ui/typography/AppLink'

const AppNav: React.FC = () => (
  <AppBox as="nav" p={4}>
    <AppBox as="ul" display="flex">
      <AppBox as="li" marginRight={2}>
        <AppLink href="/leaderboard">Leaderboard</AppLink>
      </AppBox>
      <AppBox as="li" ml={3} marginRight={2}>
        <AppLink href="/in-play">Teams in Play</AppLink>
      </AppBox>
      <AppBox as="li" ml={3} marginRight={2}>
        <AppLink href="/high-scorers">High Scorers</AppLink>
      </AppBox>
    </AppBox>
  </AppBox>
)

export default AppNav
