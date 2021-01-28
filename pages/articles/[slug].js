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
    margin: 2rem -80px;
  }

  @media (max-width: 900px) {
    .remark-highlight {
      margin: 1rem -1rem;
    }
  }

  a {
    text-decoration-skip-ink: none;
    text-decoration: underline;
  }

  // Return bulma's default code size that is overridden by Prism.
  code[class*="language-"], pre[class*="language-"] {
    font-size: 0.875em;
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
            <div className="content is-medium">
              <TitleContainer>
                <Title>{title}</Title>
                <span>
                  <time>{date}</time>, {readingTime.text}
                </span>
              </TitleContainer>

              <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
          </section>
        </article>
      </Layout>

      <Footer />
    </>
  )
}
