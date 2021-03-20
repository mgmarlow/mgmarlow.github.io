import styled from 'styled-components'
import SEO from '../components/SEO'
import Emphasis from '../components/Emphasis'
import Link from 'next/link'

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

      <Container>
        <article>
          <h1 className="is-size-3 has-text-weight-bold">Graham Marlow</h1>

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
            Read about game design and philosophy in my{' '}
            <Emphasis href="https://world.hey.com/mgmarlow" variant="purple">
              newsletter
            </Emphasis>
            , or check out my technical{' '}
            <Emphasis variant="pink" href="/articles">
              articles
            </Emphasis>
            .
          </P>
        </article>
      </Container>
    </>
  )
}
