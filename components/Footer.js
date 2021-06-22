import classnames from 'classnames'
import Link from 'next/link'
import styled from 'styled-components'

function FooterComponent({ className }) {
  return (
    <footer className={classnames(className, 'footer')}>
      <div className="content has-text-centered">
        <p>
          <Link href="/">
            <a className="has-text-weight-bold">mgmarlow.com</a>
          </Link>{' '}
          by Graham Marlow. Made with {'<'}
          <a href="https://github.com/mgmarlow/mgmarlow.com">
            insert JS framework here
          </a>
          {'>'}.
        </p>
      </div>

      <div>
        <div className="columns is-centered">
          <div className="column is-narrow">
            <div>
              <Link href="/">
                <a>about</a>
              </Link>
            </div>
            <div>
              <Link href="/articles">
                <a>articles</a>
              </Link>
            </div>
          </div>
          <div className="column is-narrow">
            <div>
              <a rel="noreferrer" href="https://world.hey.com/mgmarlow">
                newsletter
              </a>
            </div>
            <div>
              <a rel="noreferrer" href="https://techbookclub.dev">
                tech book club
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default styled(FooterComponent)`
  a {
    text-decoration: none;
  }
`
