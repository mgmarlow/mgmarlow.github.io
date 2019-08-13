import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Footer from '../components/footer'
import SEO from '../components/seo'
import styles from './post.module.css'

function Template({ data, pageContext }) {
  const title = data.markdownRemark.frontmatter.title
  const html = data.markdownRemark.html

  const { prev, next } = pageContext

  return (
    <>
      <SEO title={title} />

      <Layout>
        <article>
          <section>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </section>
        </article>

        <Footer className={styles.footer} prev={prev} next={next} />
      </Layout>
    </>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Template
