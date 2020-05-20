import React from 'react'
import { ThemeProvider } from 'styled-components'
import SEO from '../components/SEO'
import Emphasis from '../components/Emphasis'
import styles from './index.module.css'
import DefaultTheme from '../components/Layout/DefaultTheme'

const About = () => {
  const theme = {
    style: 'light',
  }

  return (
    <ThemeProvider theme={theme}>
      <DefaultTheme>
        <div className={styles.container}>
          <SEO title="Graham Marlow" excludeTemplate={true} />
          <article>
            <h1>Graham Marlow</h1>
            <p className={styles.paragraph}>
              I am a software engineer currently working at{' '}
              <Emphasis
                variant="blue"
                to="https://mindbody.io/"
                outbound={true}
              >
                Mindbody
              </Emphasis>
              . You can find my open source projects on{' '}
              <Emphasis
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
              <Emphasis variant="pink" to="/blog/">
                blog
              </Emphasis>
              .
            </p>
          </article>
        </div>
      </DefaultTheme>
    </ThemeProvider>
  )
}

export default About
