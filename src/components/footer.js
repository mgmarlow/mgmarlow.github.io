import React from 'react'
import { Link } from 'gatsby'

function Footer({ prev, next }) {
  return (
    <footer>
      {prev && (
        <Link to={prev.frontmatter.path}>&#8592; {prev.frontmatter.title}</Link>
      )}
      {next && (
        <Link to={next.frontmatter.path}>{next.frontmatter.title} &#8594;</Link>
      )}
    </footer>
  )
}

export default Footer
