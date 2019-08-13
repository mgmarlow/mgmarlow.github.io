import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import styles from './index.module.css'

function PostLink({ node }) {
  const { frontmatter } = node

  return (
    <>
      <span className={styles.date}>{frontmatter.date}</span>
      <Link to={frontmatter.path}>{frontmatter.title}</Link>
    </>
  )
}

function IndexPage({ data }) {
  const { edges } = data.allMarkdownRemark

  const posts = edges.map(({ node }, i) => (
    <li key={i}>
      <PostLink node={node} />
    </li>
  ))

  return (
    <Layout>
      <SEO title="Home" />
      <ul className={styles.list}>{posts}</ul>
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
