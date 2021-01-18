import React from 'react'
import Layout from '../../components/Layout'
import BottomMatter from '../../components/BottomMatter'
import SEO from '../../components/SEO'
import Footer from '../../components/Footer'
import styles from './[slug].module.css'

import remark from 'remark'
import html from 'remark-html'
import { getPostBySlug, getAllPosts } from '../lib/blog'

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  const markdown = await remark()
    .use(html)
    .process(post.content || '')
  const content = markdown.toString()

  return {
    props: {
      ...post,
      content,
    },
  }
}

// export async function getStaticPaths() {
//   const posts = getAllPosts()

//   return {
//     paths: posts.map((post) => {
//       return {
//         params: {
//           slug: post.slug,
//         },
//       }
//     }),
//     fallback: false,
//   }
// }

export default function Post(props) {
  // const title = data.markdownRemark.frontmatter.title
  // const date = data.markdownRemark.frontmatter.date
  // const datetime = data.markdownRemark.frontmatter.datetime
  // const html = data.markdownRemark.html

  // const { prev, next } = pageContext
  console.log(props)
  return <>foo</>

  return (
    <>
      <SEO title={title} />

      <Layout>
        <article>
          <section>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>{title}</h1>
              <time dateTime={datetime}>{date}</time>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </section>
        </article>
      </Layout>
      {/* <BottomMatter className={styles.footer} prev={prev} next={next} /> */}
      <Footer />
    </>
  )
}
