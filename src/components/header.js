import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import styles from './header.module.css'

const Header = ({ siteTitle }) => (
  <header>
    <h2>
      <Link to="/" className={styles.link}>
        {siteTitle}
      </Link>
    </h2>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
