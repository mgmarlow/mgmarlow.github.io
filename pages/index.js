import React from 'react'
import { ThemeProvider } from 'styled-components'
import SEO from '../components/SEO'
import Emphasis from '../components/Emphasis'
import Link from 'next/link'
import DefaultTheme from '../components/Layout/DefaultTheme'
import styles from './index.module.css'

const About = () => {
  const theme = {
    style: 'light',
  }

  return (
    <ThemeProvider theme={theme}>
      <DefaultTheme>
        <div className={styles.container}>
          <SEO title="mgmarlow.com" excludeTemplate={true} />
          <article>
            <h1>Graham Marlow</h1>
            <p className={styles.paragraph}>
              I am a software engineer currently working at{' '}
              <Emphasis variant="blue" href="https://mindbody.io/">
                Mindbody
              </Emphasis>
              . You can find my open source projects on{' '}
              <Emphasis variant="yellow" href="https://github.com/mgmarlow">
                Github
              </Emphasis>
              .
            </p>
            <p className={styles.paragraph}>
              Sometimes I write technical articles for my{' '}
              <Link href="/articles/" passHref>
                <Emphasis variant="pink" href="/articles/">
                  blog
                </Emphasis>
              </Link>
              . You can also check out what I'm{' '}
              <Emphasis href="https://techbookclub.dev/" variant="purple">
                reading
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
