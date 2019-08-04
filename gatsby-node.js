const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/post.js')

    resolve(
      graphql(`
        query {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___date] }
          ) {
            edges {
              node {
                frontmatter {
                  path
                  title
                }
              }
            }
          }
        }
      `).then(result => {
        const posts = result.data.allMarkdownRemark.edges

        posts.forEach(({ node }, i) => {
          const path = node.frontmatter.path

          createPage({
            path,
            component: blogPostTemplate,
            context: {
              pathSlug: path,
              prev: i === 0 ? undefined : posts[i - 1].node,
              next: i === posts.length - 1 ? undefined : posts[i + 1].node,
            },
          })

          resolve()
        })
      }),
    )
  })
}
