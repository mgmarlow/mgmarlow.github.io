The obligatory migration post.

Overview:

- Followed the [nextJS conversion guide](https://nextjs.org/docs/migrating/from-gatsby).
  - Noteworthy that this guide does a good job walking through the hardest bit, which is updating the data from gatsby-node to use `pages/[slug].js.`
- Migrated global styles to `_app.js`
- Major hangups were adjusting my gatsby-node.js graphQL data to the nextJS equivalent.
- Needed to install an extra remark plugin to get prismJS to render with the proper theme.
- styled-components w/ babel needed a new `.babelrc` file.
- Styling link components with styled components is weirdly challenging.
- Deploying to Github pages is a bit annoying, so also moved over to Netlify which worked out of the box.
