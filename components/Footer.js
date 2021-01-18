import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.textCentered}>
      <Link href="/"><a>mgmarlow.github.io</a></Link> by Graham Marlow
    </p>
  </footer>
)

export default Footer
