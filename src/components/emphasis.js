import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

const EmphasisLink = styled(Link)`
  font-size: 1.5rem;
  color: #333;
  z-index: 1;
  text-decoration: none;
  position: relative;

  &::after {
    background-color: ${props => {
      switch (props.variant) {
        case 'yellow':
          return 'rgba(255, 222, 3, 0.4)'
        case 'blue':
          return 'rgba(3, 54, 255, 0.3)'
        case 'purple':
          return 'rgba(148, 54, 255, 0.4)'
        case 'pink':
        default:
          return 'rgba(255, 2, 66, 0.4)'
      }
    }};
  }

  &:hover::after {
    top: 0%;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 60%;
    left: -0.1em;
    right: -0.1em;
    bottom: 0;
    transition: top 200ms cubic-bezier(0, 0.8, 0.13, 1);
  }
`

const Emphasis = ({ children, to, variant, outbound }) => (
  <EmphasisLink variant={variant} as={outbound ? OutboundLink : Link} href={to}>
    {children}
  </EmphasisLink>
)

export default Emphasis
