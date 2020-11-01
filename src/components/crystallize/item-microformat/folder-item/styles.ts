import styled from 'styled-components'

import { responsive } from 'components/crystallize/ui'

export const Outer = styled.a`
  display: block;
  height: 100%;
  color: var(--color-main-background);
  position: relative;
  padding: 1em;
  background: var(--color-box-background);
  grid-column-end: span 4;
  ${responsive.xs} {
    margin-bottom: 15px;
  }
`

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  height: 100%;
`

export const Text = styled.div`
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1em;

  h3 {
    position: absolute;
    bottom: 4rem;
    width: 100%;
    left: 0%;
    font-size: 1.4em;
    text-transform: uppercase;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    color: black;
  }
`

export const Price = styled.span`
  color: inherit;
  font-weight: bold;
`
