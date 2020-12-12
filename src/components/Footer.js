import React from 'react'
import { Link } from 'gatsby'
import styles from './Footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.textCentered}>
      <Link to="/">mgmarlow.github.io</Link> by Graham Marlow
    </p>
  </footer>
)

export default Footer
