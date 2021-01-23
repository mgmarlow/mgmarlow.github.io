import Link from 'next/link'
import styles from './Footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <p>
      <Link href="/">
        <a>mgmarlow.com</a>
      </Link>{' '}
      by Graham Marlow.
    </p>
    <p>
      Made with {'<'}
      <a href="https://nextjs.org/">insert JS framework here</a>
      {'>'}.
    </p>
  </footer>
)

export default Footer
