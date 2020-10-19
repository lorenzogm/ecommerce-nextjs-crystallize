import styled from 'styled-components'
import is from 'styled-is'

import { responsive, H3, Outer as GlobalOuter } from 'themes/crystallize/ui'

export const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
`

export const Outer = styled(GlobalOuter)`
  ${is('center')`
    padding-top: 20vh;
    text-align: center;
  `};
`

export const Inner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 30px;
  grid-gap: 15px;
  ${responsive.smAndLess} {
    grid-template-columns: 1fr;
  }
`

export const ErrorMessage = styled.p`
  font-size: 16px;
  color: var(--color-error);
  margin-top: 1rem;
`

export const StripeWrapper = styled.div`
  width: 100%;
  padding-bottom: 1rem;
`

export const PaymentProviders = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const PaymentButton = styled.button`
  background: ${(p) => p.color};
  font-size: 18px;
  padding: 0.5rem;
  width: 32%;
  margin-right: 1%;
  height: 80px;
  border-radius: 10px;

  img {
    max-width: 100px;
    max-height: 25px;
    display: block;
    margin: 0 auto;
  }

  &:last-child {
    border-bottom: none;
  }

  opacity: 0.5;
  ${is('selected')`
    opacity: 1;
  `};
`

export const PaymentProvider = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
`

export const PaymentSelector = styled.div`
  display: flex;
`
