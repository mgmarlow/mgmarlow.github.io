import React from 'react'
import remark from 'remark'
import html from 'remark-html'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import Footer from '../../components/Footer'
import { getPostBySlug, getAllPosts } from '../../lib/blog'
import styles from './[slug].module.css'

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  const markdown = await remark()
    .use(html)
    .process(post.content || '')
  const content = markdown.toString()

  return {
    props: {
      ...post.frontmatter,
      content,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()
  const paths = posts.map((p) => `/articles/${p.slug}`)

  return { paths, fallback: false }
}

export default function Post({ content, title, date }) {
  return (
    <>
      <SEO title={title} />

      <Layout>
        <article>
          <section>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>{title}</h1>
              <time>{date}</time>
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
