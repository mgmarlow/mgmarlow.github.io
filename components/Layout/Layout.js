import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import Header from '../Header'
import Container from '../Container'
import DefaultTheme from './DefaultTheme'
import config from '../../config'

const Layout = ({ children }) => {
  const siteTitle = config.title

  const theme = {
    style: 'light',
  }

  return (
    <ThemeProvider theme={theme}>
      <DefaultTheme>
        <Container>
          <Header siteTitle={siteTitle} />
          <main>{children}</main>
        </Container>
      </DefaultTheme>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
