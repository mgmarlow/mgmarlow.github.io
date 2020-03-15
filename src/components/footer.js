import React from 'react'
import SignupForm from './signup-form'
import styles from './footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div>
      <SignupForm />

      {/* TODO: about, blog, and experiments links */}
      {/* <Link to="/experiments/">experiments</Link> */}
    </div>
  </footer>
)

export default Footer
