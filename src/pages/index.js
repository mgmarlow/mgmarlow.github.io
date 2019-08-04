import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

function PostLink({ node }) {
  const { frontmatter } = node

  return (
    <Link to={frontmatter.path}>
      <span>{frontmatter.date}</span>
      {frontmatter.title}
    </Link>
  )
}

function IndexPage({ data }) {
  const { edges } = data.allMarkdownRemark

  const posts = edges.map(({ node }) => (
    <li>
      <PostLink node={node} />
    </li>
  ))

  return (
    <Layout>
      <SEO title="Home" />
      <ul>{posts}</ul>
    </Layout>
  )
}

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
          }
        }
      }
    }
  }
`

export default IndexPage
