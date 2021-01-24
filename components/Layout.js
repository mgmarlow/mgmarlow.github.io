import PropTypes from 'prop-types'
import Header from './Header'
import Container from './Container'
import config from '../config'

const Layout = ({ children }) => {
  const siteTitle = config.title

  return (
    <Container>
      <Header siteTitle={siteTitle} />
      <main>{children}</main>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
