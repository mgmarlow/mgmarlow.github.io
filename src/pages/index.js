import React from 'react'
import { Link } from 'gatsby'
import SEO from '../components/seo'
import styles from './index.module.css'

const About = () => {
  return (
    <div className={styles.container}>
      <SEO title="Graham Marlow" excludeTemplate={true} />
      <article>
        <h1>Graham Marlow</h1>
        <p className={styles.paragraph}>
          I am a software engineer currently working at{' '}
          <a
            className={styles.link}
            rel="noreferrer"
            href="https://mindbody.io"
          >
            MINDBODY
          </a>
          . You can find my open source projects on{' '}
          <a
            className={styles.link}
            rel="noreferrer"
            href="https://github.com/mgmarlow"
          >
            Github
          </a>
          .
        </p>
        <p className={styles.paragraph}>
          Sometimes I write technical articles and publish them on my{' '}
          <Link className={styles.link} to="/blog/">
            blog
          </Link>
          .
        </p>
      </article>
    </div>
  )
}

export default About
