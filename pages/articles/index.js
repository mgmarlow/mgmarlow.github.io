import Media from 'react-media'
import Link from 'next/link'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import { getAllPosts } from '../../lib/blog'
import styles from './index.module.css'

export async function getStaticProps({ params }) {
  const posts = getAllPosts()
  const postDetails = posts.map((p) => ({
    slug: p.slug,
    readingTime: p.readingTime,
    ...p.frontmatter,
  }))

  return { props: { posts: postDetails } }
}

function PostLink({ post }) {
  const path = `articles/${post.slug}`

  return (
    <div className={styles.listItem}>
      <Link href={path}>
        <h3 className={styles.link}>
          <a>{post.title}</a>
        </h3>
      </Link>

      <div>
        {post.date}, {post.readingTime.text}
      </div>
    </div>
  )
}

export default function Articles({ posts }) {
  const postItems = posts.map((post, i) => (
    <li key={i}>
      <PostLink post={post} />
    </li>
  ))

  return (
    <Layout>
      <SEO />

      <ul className={styles.list}>{postItems}</ul>

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
