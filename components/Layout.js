import PropTypes from 'prop-types'
import Header from './Header'
import Container from './Container'
import ThemeProvider from './ThemeProvider'
import config from '../config'

const Layout = ({ children }) => {
  const siteTitle = config.title

  return (
    <ThemeProvider>
      <Container>
        <Header siteTitle={siteTitle} />
        <main>{children}</main>
      </Container>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
