import React from 'react'
import Media from 'react-media'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import styles from './index.module.css'

function PostLink({ node }) {
  const { frontmatter } = node

  return (
    <Media query="(max-width: 600px)">
      {matches =>
        matches ? (
          <div className={styles.listItem}>
            <Link to={frontmatter.path}>{frontmatter.title}</Link>
            <div>{frontmatter.date}</div>
          </div>
        ) : (
          <>
            <span className={styles.date}>{frontmatter.date}</span>
            <Link to={frontmatter.path}>{frontmatter.title}</Link>
          </>
        )
      }
    </Media>
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
      <SEO title="Articles" />
      <ul className={styles.list}>{posts}</ul>
      <footer>
        <a href="https://mgmarlow.github.io">about</a> •{' '}
        <a href="https://github.com/mgmarlow">github</a> •{' '}
        <Link to="/rss.xml">rss</Link>
      </footer>
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
