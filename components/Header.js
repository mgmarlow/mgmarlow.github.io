import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import PropTypes from 'prop-types'

const activeClassName = 'active-header'

const HeaderLink = styled('a').attrs({
  activeClassName,
})`
  font-size: 1.5rem;
  cursor: pointer;
  color: #000;

  &.${activeClassName} {
    color: #333;
    text-decoration: none;
  }
`

const Header = ({ siteTitle }) => (
  <header>
    <Link href="/articles/">
      <HeaderLink>{siteTitle}/articles</HeaderLink>
    </Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
