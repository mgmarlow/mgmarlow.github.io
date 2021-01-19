import classnames from 'classnames'
import Media from 'react-media'
import Link from 'next/link'
import styles from './BottomMatter.module.css'

function BottomMatter({ className, prev, next }) {
  return (
    <div className={classnames(className, styles.wrapper)}>
      <Media query="(max-width: 600px)">
        {(matches) =>
          matches && <h4 className={styles.mobileHeader}>Other Articles</h4>
        }
      </Media>

      <div className={styles.content}>
        {prev && (
          <Link className={styles.leftLink} href={prev.frontmatter.path}>
            <a>{prev.frontmatter.title}</a>
          </Link>
        )}
        {next && (
          <Link className={styles.rightLink} href={next.frontmatter.path}>
            <a>{next.frontmatter.title}</a>
          </Link>
        )}
      </div>
    </div>
  )
}

export default BottomMatter
