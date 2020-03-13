import React from 'react'
import classnames from 'classnames'
import Media from 'react-media'
import { Link } from 'gatsby'
import SignupForm from './SignupForm'
import styles from './footer.module.css'

function Footer({ className, prev, next }) {
  return (
    <footer className={classnames(className, styles.wrapper)}>
      <Media query="(max-width: 600px)">
        {matches =>
          matches && <h4 className={styles.mobileHeader}>Other Articles</h4>
        }
      </Media>

      <SignupForm />

      <div className={styles.content}>
        {prev && (
          <Link className={styles.leftLink} to={prev.frontmatter.path}>
            {prev.frontmatter.title}
          </Link>
        )}
        {next && (
          <Link className={styles.rightLink} to={next.frontmatter.path}>
            {next.frontmatter.title}
          </Link>
        )}
      </div>
    </footer>
  )
}

export default Footer
