import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import config from '../config'

export default function SEO({ description, title }) {
  const siteTitle = config.title

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:type" content="website" />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:site_name" content={siteTitle} />
    </Head>
  )
}

SEO.defaultProps = {
  title: 'mgmarlow.com',
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}
