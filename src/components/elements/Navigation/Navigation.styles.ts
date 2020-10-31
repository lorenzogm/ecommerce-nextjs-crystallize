import styled from 'styled-components'
import is from 'styled-is'

import { responsive } from 'components/crystallize/ui'

export const Nav = styled.nav`
  display: flex;
  margin: 10px 0 0 15px;
  padding-left: 15px;
  width: 100%;
  ${responsive.mdPlus} {
    justify-content: center;
  }
  ${responsive.smAndLess} {
    display: none;
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    min-height: 100vh;
    height: 100%;
    overflow-x: auto;
    scroll-behavior: smooth;
    border: none;
    background: #fafafa;
    margin: 0;
    padding: 2em;
    font-size: 1.5rem;

    ${is('open')`
      display: block;
    `};
  }
`

export const NavList = styled.ul`
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;

  /* Make space for logout button */
  ${responsive.smAndLess} {
    margin-top: 30px;
  }
`

export const NavListItem = styled.li`
  margin: 0;
  padding: 0;
  display: inline-block;
  margin: 0 5px;

  > a {
    display: inline-block;
    padding: 10px 10px;
    transition: all 100ms;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    &:hover {
      text-decoration: underline;
    }
  }

  ${responsive.smAndLess} {
    display: block;
  }
`
