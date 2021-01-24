import remark from 'remark'
import prism from 'remark-prism'
import html from 'remark-html'
import styled, { createGlobalStyle } from 'styled-components'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import Footer from '../../components/Footer'
import { getPostBySlug, getAllPosts } from '../../lib/blog'

const GlobalStyle = createGlobalStyle`
  .remark-highlight {
    margin: 1rem -80px;
  }

  @media (max-width: 1000px) {
    .remark-highlight {
      margin: 0 -1rem;
    }
  }

  a {
    text-decoration-skip-ink: none;
    text-decoration: underline;
  }

  blockquote {
    margin: 1rem;
    padding-left: 1rem;
    border-left: 5px solid #828282;
  }

  li {
    margin-bottom: 0.75rem;
  }

  h2 {
    margin-top: 3rem;
  }

  p {
    margin: 1.75rem 0;
  }
`

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)

  const markdown = await remark()
    .use(prism)
    .use(html)
    .process(post.content || '')

  return {
    props: {
      ...post.frontmatter,
      content: markdown.toString(),
      readingTime: post.readingTime,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()
  const paths = posts.map((p) => ({ params: { slug: p.slug } }))

  return { paths, fallback: false }
}

const TitleContainer = styled.div`
  margin: 2rem 0;
`

const Title = styled.h1`
  margin: 0.85rem 0;
`

export default function Post({ content, title, date, readingTime }) {
  return (
    <>
      <SEO title={title} />

      <Layout>
        <GlobalStyle />

        <article>
          <section>
            <TitleContainer>
              <Title>{title}</Title>
              <span>
                <time>{date}</time>, {readingTime.text}
              </span>
            </TitleContainer>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </section>
        </article>
      </Layout>

      <Footer />
    </>
  )
}
