import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Header from '../header'
import Container from '../Container'
import DefaultTheme from './DefaultTheme'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <DefaultTheme>
      <Container>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
      </Container>
    </DefaultTheme>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
