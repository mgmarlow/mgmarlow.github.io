import React from 'react'
import { Link } from 'gatsby'

function Footer({ prev, next }) {
  return (
    <footer>
      {prev && <Link to={prev.frontmatter.path}>{prev.frontmatter.title}</Link>}
      {next && <Link to={next.frontmatter.path}>{next.frontmatter.title}</Link>}
    </footer>
  )
}

export default Footer
