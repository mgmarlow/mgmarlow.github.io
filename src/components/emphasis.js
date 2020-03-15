import React from 'react'
import classnames from 'classnames'
import styles from './emphasis.module.css'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

const Emphasis = ({ className, children, to, variant, outbound }) => {
  const classes = classnames(className, styles.emphasis, {
    [styles.pink]: variant === 'pink',
    [styles.yellow]: variant === 'yellow',
    [styles.blue]: variant === 'blue',
    [styles.purple]: variant === 'purple',
  })

  return outbound ? (
    <OutboundLink className={classes} href={to}>
      {children}
    </OutboundLink>
  ) : (
    <Link className={classes} to={to}>
      {children}
    </Link>
  )
}

export default Emphasis
