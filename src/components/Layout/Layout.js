import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Header from '../Header'
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

  const theme = {
    style: 'light',
  }

  return (
    <ThemeProvider theme={theme}>
      <DefaultTheme>
        <Container>
          <Header siteTitle={data.site.siteMetadata.title} />
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
