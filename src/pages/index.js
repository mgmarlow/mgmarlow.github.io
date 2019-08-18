import React from 'react'
import { Link } from 'gatsby'
import SEO from '../components/seo'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import styles from './index.module.css'

const About = () => {
  return (
    <div className={styles.container}>
      <SEO title="Graham Marlow" excludeTemplate={true} />
      <article>
        <h1>Graham Marlow</h1>
        <p className={styles.paragraph}>
          I am a software engineer currently working at{' '}
          <OutboundLink className={styles.link} href="https://mindbody.io">
            MINDBODY
          </OutboundLink>
          . You can find my open source projects on{' '}
          <OutboundLink
            className={styles.link}
            href="https://github.com/mgmarlow"
          >
            Github
          </OutboundLink>
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
