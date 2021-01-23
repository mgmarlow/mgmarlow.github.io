---
title: 'Gatsby to Next.js Migration'
date: '2021-01-18'
---

I migrated my blog from Gatsby to Next.js to capitalize on all of the Next.js hype, as you do. As blog custom necessitates, this is a log of that migration.

Originally I planned to rewrite my blog from scratch, using Next.js conventions from the beginning to avoid headaches. The Next.js guide, [migrating from Gatsby](https://nextjs.org/docs/migrating/from-gatsby), convinced me otherwise. Most of the items in that guide are as simple as they are stated and do not require rehashing. However, there are a few unexpected aspects to the migration that I explain in this article.

View the whole migration in [this squashed commit](https://github.com/mgmarlow/mgmarlow.com/commit/cc3ba9adf189052fb17f6a9b664ed57564c31b05) on Github.

## Markdown + Prism

Next.js describes in detail the steps to [convert from Gatsby's data fetching strategy](https://nextjs.org/docs/migrating/from-gatsby#data-fetching) with regards to rendering markdown. If you want to use [Prism](https://prismjs.com/) for syntax highlighting, two extra steps are needed:

1. Global styles are moved to a custom `App` component in [`pages/_app.js`](https://nextjs.org/docs/advanced-features/custom-app). This is where you import your Prism theme.

```jsx
import 'prismjs/themes/prism-tomorrow.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

2. An extra `remark` plugin, [remark-prism](https://github.com/sergioramos/remark-prism), is included in the `remark` call chain.

```js
// pages/[slug].js
import remark from 'remark'
import prism from 'remark-prism'
import html from 'remark-html'
// ...

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)

  const markdown = await remark()
    .use(prism) // New dependency
    .use(html)
    .process(post.content || '')

  return {
    props: {
      ...post.frontmatter,
      content: markdown.toString(),
    },
  }
}
```

## Styled components

You are probably already using [Gatsby's styled-components plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-styled-components/) to enable server-side rendering. Since part of the Next.js conversion is moving out of the Gatsby plugin ecosystem, you need to implement the features of this plugin manually.

Add a new file, `.babelrc`, and extend the default `next` preset:

```
yarn add babel-plugin-styled-components --dev
```

```json
// .babelrc
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

Additionally, if you're using `createGlobalStyle` to create a theme for your application, you need to extend your app with a [custom `Document`](https://nextjs.org/docs/advanced-features/custom-document).

```js
// pages/_document.js
import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
```

This custom [`Document`](https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js) completes the styled-components integration.

- [`ServerStyleSheet`](https://styled-components.com/docs/advanced#example) is the styled-components API that enables server-side rendering (SSR). It wraps the Next.js application with a provider, making your styles available via a context API for SSR.
- [`babel-plugin-styled-components`](https://github.com/styled-components/babel-plugin-styled-components) adds a unique identifier to every styled component to avoid [HTML attribute mismatches](https://styled-components.com/docs/tooling#serverside-rendering).

## Github Pages deployments

One last gotcha that is well explained in [James Wallis's blog post](https://dev.to/jameswallis/deploying-a-next-js-app-to-github-pages-24pn) involves Github pages deployments. If you're deploying a site that has its own dedicated repository, e.g. `github.com/mgmarlow/some-repo`, you need to configure Next.js's base paths to locate assets in the proper directory.

Add the following to `next.config.js`, substituting `some-repo` with the name of your respository.

```js
// next.config.js
module.exports = {
  basePath: '/some-repo',
  assetPrefix: '/some-repo/',
}
```
