import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Footer from '../components/footer'

function Template({ data, pageContext }) {
  const title = data.markdownRemark.frontmatter.title
  const html = data.markdownRemark.html

  const { prev, next } = pageContext

  return (
    <Layout>
      <article>
        <section>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </section>
        <Footer prev={prev} next={next} />
      </article>
    </Layout>
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
