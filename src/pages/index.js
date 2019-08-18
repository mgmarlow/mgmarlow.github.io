import React from 'react'
import SEO from '../components/seo'
import Emphasis from '../components/emphasis'
import styles from './index.module.css'

const About = () => {
  return (
    <div className={styles.container}>
      <SEO title="Graham Marlow" excludeTemplate={true} />
      <article>
        <h1>Graham Marlow</h1>
        <p className={styles.paragraph}>
          I am a software engineer currently working at{' '}
          <Emphasis
            className={styles.link}
            variant="blue"
            to="https://mindbody.io/"
            outbound={true}
          >
            MINDBODY
          </Emphasis>
          . You can find my open source projects on{' '}
          <Emphasis
            className={styles.link}
            variant="yellow"
            to="https://github.com/mgmarlow"
            outbound={true}
          >
            Github
          </Emphasis>
          .
        </p>
        <p className={styles.paragraph}>
          Sometimes I write technical articles and publish them on my{' '}
          <Emphasis className={styles.link} variant="pink" to="/blog/">
            blog
          </Emphasis>
          .
        </p>
      </article>
    </div>
  )
}

export default About
