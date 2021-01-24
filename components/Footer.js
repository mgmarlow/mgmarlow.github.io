import styled from 'styled-components'
import Link from 'next/link'

const Footer = styled.footer`
  background-color: #f5f5f5;
  text-align: center;
  margin-top: 5rem;
  padding-top: 4rem;
  padding-bottom: 5rem;
`

export default function FooterComponent() {
  return (
    <Footer>
      <p>
        <Link href="/">
          <a>mgmarlow.com</a>
        </Link>{' '}
        by Graham Marlow.
      </p>
      <p>
        Made with {'<'}
        <a href="https://nextjs.org/">insert JS framework here</a>
        {'>'}.
      </p>
    </Footer>
  )
}
