import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
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
    <HeaderLink to="/articles/">{siteTitle}</HeaderLink>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
