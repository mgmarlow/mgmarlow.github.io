import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import PropTypes from 'prop-types'

const activeClassName = 'active-header'

const HeaderLink = styled(Link).attrs({
  activeClassName,
})`
  font-size: 1.5rem;

  &.${activeClassName} {
    color: #333;
    text-decoration: none;
  }
`

const Header = ({ siteTitle }) => (
  <header>
    <HeaderLink href="/articles/"><a>{siteTitle}</a></HeaderLink>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
