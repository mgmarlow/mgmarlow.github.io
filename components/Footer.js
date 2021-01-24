import Link from 'next/link'

export default function FooterComponent() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <Link href="/">
            <a>about</a>
          </Link>{' '}
          •{' '}
          <Link href="/articles">
            <a>articles</a>
          </Link>{' '}
          •{' '}
          <a rel="noreferrer" href="https://github.com/mgmarlow">
            github
          </a>
        </p>

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
    </footer>
  )
}
