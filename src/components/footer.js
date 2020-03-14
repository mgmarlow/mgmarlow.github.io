import React from 'react'
import SignupForm from './signup-form'
import styles from './footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div>
      <SignupForm />
    </div>
  </footer>
)

export default Footer
