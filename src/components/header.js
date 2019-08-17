import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import styles from './header.module.css'

const Header = ({ siteTitle }) => (
  <header>
    <Link to="/blog" className={styles.link}>
      {siteTitle}
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
