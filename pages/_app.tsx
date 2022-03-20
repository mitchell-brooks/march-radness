import { AnimatePresence } from 'framer-motion'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Grommet } from 'grommet'

import NProgress from '~/components/NProgress'
import AppNav from '~/components/layout/AppNav'
import GlobalStyle from '~/styles/global'
import { light } from '~/styles/themes'

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props

    return (
      <Grommet plain>
        <ThemeProvider theme={light}>
          <GlobalStyle />
          <NProgress color={light.colors.primary} spinner={false} />
          <AppNav />
          <AnimatePresence exitBeforeEnter initial={false}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </ThemeProvider>
      </Grommet>
    )
  }
}

export default MyApp
