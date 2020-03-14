import React from 'react'
import classnames from 'classnames'
import Media from 'react-media'
import { Link } from 'gatsby'
import styles from './bottom-matter.module.css'

function BottomMatter({ className, prev, next }) {
  return (
    <div className={classnames(className, styles.wrapper)}>
      <Media query="(max-width: 600px)">
        {matches =>
          matches && <h4 className={styles.mobileHeader}>Other Articles</h4>
        }
      </Media>

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
    </div>
  )
}

export default BottomMatter
