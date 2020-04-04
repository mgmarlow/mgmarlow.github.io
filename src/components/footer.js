import React from 'react'
import { Link } from 'gatsby'
import SignupForm from './signup-form'
import styles from './footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.flexCenter}>
      <div className={styles.container}>
        <div>
          <SignupForm className={styles.form} />
        </div>

        <div>
          <ul className={styles.list}>
            <li className={styles.linkItem}>
              <Link to="/">about</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/blog/">blog</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p className={styles.textCentered}>
      <Link to="/">mgmarlow.github.io</Link> by Graham Marlow
    </p>
  </footer>
)

export default Footer
