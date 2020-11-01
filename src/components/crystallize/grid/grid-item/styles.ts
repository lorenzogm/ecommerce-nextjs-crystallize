import styled from 'styled-components'

import { H3 } from 'components/crystallize/ui'

export const Title = styled(H3)`
  font-size: 1.5rem;
  text-transform: uppercase;
  color: var(--color-text-main);
  font-weight: 900;
  font-family: 'Roboto', sans-serif;
  text-align: center;
`

export const Text = styled.div`
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  align-items: center;
`

export const Price = styled.span`
  color: inherit;
  font-size: 1.5rem;
  color: var(--color-price);
  font-weight: bold;
`
