import React from 'react'
import Media from 'react-media'
import Link from 'next/link'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import styles from './index.module.css'

import { getAllPosts } from '../../lib/blog'

export async function getStaticProps({ params }) {
  const posts = getAllPosts()
  const slugs = posts.map((p) => p.slug)
  console.log(slugs)

  return { props: {} }
}

export async function getStaticPaths() {
  const posts = getAllPosts()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

function PostLink({ node }) {
  const { frontmatter } = node

  return (
    <Media query="(max-width: 600px)">
      {(matches) =>
        matches ? (
          <div className={styles.listItem}>
            <Link href={frontmatter.path}>
              <a>{frontmatter.title}</a>
            </Link>
            <div>{frontmatter.date}</div>
          </div>
        ) : (
          <>
            <span className={styles.date}>{frontmatter.date}</span>
            <Link href={frontmatter.path}>
              <a>{frontmatter.title}</a>
            </Link>
          </>
        )
      }
    </Media>
  )
}

export default function Articles(props) {
  console.log(props)
  return <>foo</>

  const { edges } = data.allMarkdownRemark

  const posts = edges.map(({ node }, i) => (
    <li key={i}>
      <PostLink node={node} />
    </li>
  ))

  return (
    <Layout>
      <SEO />

      <ul className={styles.list}>{posts}</ul>

      <footer>
        <Link href="/">
          <a>about</a>
        </Link>{' '}
        •{' '}
        <a rel="noreferrer" href="https://github.com/mgmarlow">
          github
        </a>{' '}
        •{' '}
        <a
          href="https://mgmarlow.github.io/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
        >
          rss
        </a>
      </footer>
    </Layout>
  )
}
