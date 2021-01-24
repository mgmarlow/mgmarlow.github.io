import styled from 'styled-components'
import SEO from '../components/SEO'
import Emphasis from '../components/Emphasis'
import Link from 'next/link'
import ThemeProvider from '../components/ThemeProvider'

const Container = styled.div`
  box-sizing: content-box;
  max-width: 425px;
  padding: 5vh 10vw;
`

const P = styled.p`
  margin: 1.75rem 0;
  font-size: 1.5rem;
`

export default function Home() {
  return (
    <>
      <SEO title="mgmarlow.com" />

      <ThemeProvider>
        <Container>
          <article>
            <h1>Graham Marlow</h1>
            <P>
              I am a software engineer currently working at{' '}
              <Emphasis variant="blue" href="https://mindbody.io/">
                Mindbody
              </Emphasis>
              . You can find my open source projects on{' '}
              <Emphasis variant="yellow" href="https://github.com/mgmarlow">
                Github
              </Emphasis>
              .
            </P>
            <P>
              Sometimes I write technical articles for my{' '}
              <Link href="/articles/" passHref>
                <Emphasis variant="pink" href="/articles">
                  blog
                </Emphasis>
              </Link>
              . You can also check out what I'm{' '}
              <Emphasis href="https://techbookclub.dev/" variant="purple">
                reading
              </Emphasis>
              .
            </P>
          </article>
        </Container>
      </ThemeProvider>
    </>
  )
}
