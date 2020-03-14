import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import BottomMatter from '../components/bottom-matter'
import SEO from '../components/seo'
import Footer from '../components/footer'
import styles from './post.module.css'

function Template({ data, pageContext }) {
  const title = data.markdownRemark.frontmatter.title
  const date = data.markdownRemark.frontmatter.date
  const datetime = data.markdownRemark.frontmatter.datetime
  const html = data.markdownRemark.html

  const { prev, next } = pageContext

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
      <BottomMatter className={styles.footer} prev={prev} next={next} />
      <Footer />
    </>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMM. DD, YYYY")
        datetime: date(formatString: "YYYY-MM-DD")
      }
    }
  }
`

export default Template
