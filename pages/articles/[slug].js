import remark from 'remark'
import prism from 'remark-prism'
import html from 'remark-html'
import readingTime from '../../lib/remarkReadingTime'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import Footer from '../../components/Footer'
import { getPostBySlug, getAllPosts } from '../../lib/blog'
import styles from './[slug].module.css'

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)

  const markdown = await remark()
    .use(readingTime)
    .use(prism)
    .use(html)
    .process(post.content || '')

  return {
    props: {
      ...post.frontmatter,
      content: markdown.toString(),
      readingTime: markdown.readingTime,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()
  const paths = posts.map((p) => ({ params: { slug: p.slug } }))

  return { paths, fallback: false }
}

export default function Post({ content, title, date, readingTime }) {
  return (
    <>
      <SEO title={title} />

      <Layout>
        <article>
          <section>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>{title}</h1>
              <span>
                <time>{date}</time>, {readingTime.text}
              </span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </section>
        </article>
      </Layout>

      {/* TODO: */}
      {/* <BottomMatter className={styles.footer} prev={prev} next={next} /> */}
      <Footer />
    </>
  )
}
