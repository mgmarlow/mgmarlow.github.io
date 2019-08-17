import React from 'react'
import { Link } from 'gatsby'
import SEO from '../components/seo'
import styles from './index.module.css'

const About = () => {
  return (
    <div className={styles.container}>
      <SEO title="Graham Marlow" excludeTemplate={true} />
      <article>
        <h2>Graham Marlow</h2>
        <p>
          I am a software engineer currently working at{' '}
          <a rel="noreferrer" href="https://mindbody.io">
            MINDBODY
          </a>
          . You can find many of my open source contributions on{' '}
          <a rel="noreferrer" href="https://github.com/mgmarlow">
            Github
          </a>
          .
        </p>
        <p>
          Sometimes I write technical articles and publish them on my{' '}
          <Link className={styles.emphasisLink} to="/blog">
            blog
          </Link>
          .
        </p>
      </article>
    </div>
  )
}

export default About
