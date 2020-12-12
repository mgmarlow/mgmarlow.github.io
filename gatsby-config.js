module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `mgmarlow.com/blog`,
    description: `The articles and projects of Graham Marlow.`,
    siteUrl: `https://mgmarlow.com/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/content/articles`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // TODO: https://www.gatsbyjs.org/packages/gatsby-remark-images/
        plugins: [`gatsby-remark-prismjs`, `gatsby-remark-reading-time`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-77807439-2`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `mgmarlow.com`,
        short_name: `archive`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/booklet.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
