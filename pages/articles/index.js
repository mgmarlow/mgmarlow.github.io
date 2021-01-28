import styled from 'styled-components'
import Link from 'next/link'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import Footer from '../../components/Footer'
import { getAllPosts } from '../../lib/blog'

export async function getStaticProps({ params }) {
  const posts = getAllPosts()
  const postDetails = posts.map((p) => ({
    slug: p.slug,
    readingTime: p.readingTime,
    ...p.frontmatter,
  }))

  return { props: { posts: postDetails } }
}

const ListItem = styled.div`
  margin-bottom: 2rem;
`

const LinkTitle = styled.h2`
  cursor: pointer;
`

const PostLink = styled.a`
  text-decoration: none;
`

function PostItem({ post }) {
  const path = `articles/${post.slug}`

  return (
    <ListItem>
      <Link href={path}>
        <LinkTitle className="is-size-3 is-size-5-mobile">
          <PostLink>{post.title}</PostLink>
        </LinkTitle>
      </Link>

      <p>
        {post.date}, {post.readingTime.text}
      </p>
    </ListItem>
  )
}

const List = styled.ul`
  list-style: none;
  margin: 2rem 0;
  padding: 0;
`

export default function Articles({ posts }) {
  const postItems = posts.map((post, i) => (
    <li key={i}>
      <PostItem post={post} />
    </li>
  ))

  return (
    <>
      <SEO />

      <Layout>
        <List>{postItems}</List>
      </Layout>

      <Footer className="mt-6" />
    </>
  )
}
