import Link from 'next/link'
import classnames from 'classnames'

export default function FooterComponent({ className }) {
  return (
    <footer className={classnames(className, 'footer')}>
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
