import styled from 'styled-components'
import is from 'styled-is'

import { responsive } from 'themes/crystallize/ui'

export const Outer = styled.header`
  text-align: center;
  padding: 20px 75px;
  max-width: 1600px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto 0;

  ${responsive.smAndLess} {
    padding: 10px 90px 10px 20px;
    justify-content: space-between;
  }
`

export const Logo = styled.div`
  height: 84px;
  display: block;
  object-fit: contain;

  img,
  svg {
    height: 100%;
  }
`

export const Basket = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  padding: 0;
  border-radius: 5px;
  justify-self: flex-end;

  img,
  svg {
    width: 40px;
  }
  svg path {
    stroke: var(--color-text-sub);
  }

  &:hover,
  &:active {
    background: rgba(0, 0, 0, 0.05);
  }
`

export const BasketQuantity = styled.div`
  position: absolute;
  font-weight: 500;
  font-size: 14px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -25%);
`

export const NavActions = styled.div`
  margin: 8px 10px 0;
  display: flex;
  text-transform: uppercase;
  align-items: center;

  button,
  a {
    padding: 5px 10px;
    font-size: 14px;
    font-weight: 500;
    border: 1.4px solid var(--color-text-main);
    color: var(--color-text-main);
    white-space: nowrap;

    cursor: pointer;

    &:hover {
      background: var(--color-text-main);
      color: var(--color-main-background);
      text-decoration: none;
    }
  }

  ${responsive.smAndLess} {
    display: none;
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    z-index: 99;
    text-align: center;
    margin: 0;
    font-size: 1.5rem;

    ${is('open')`
      display: flex;
      justify-content: center;
    `};
  }
`

export const PreviewBar = styled.div`
  background: #000;
  color: #fff;
  padding: 20px;
  text-align: center;
`
