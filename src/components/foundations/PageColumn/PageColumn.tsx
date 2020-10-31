import styled from 'styled-components'

import breakpoints from 'styles/breakpoints'

export default styled.div`
  float: left;

  ${({ xs }) => (xs ? getWidthString(xs) : `width: 100%;`)}

  @media only screen and (min-width: ${breakpoints.sm}px) {
    ${({ sm }) => sm && getWidthString(sm)}
  }

  @media only screen and (min-width: ${breakpoints.md}px) {
    ${({ md }) => md && getWidthString(md)}
  }

  @media only screen and (min-width: ${breakpoints.lg}px) {
    ${({ lg }) => lg && getWidthString(lg)}
  }

  @media only screen and (min-width: ${breakpoints.xl}px) {
    ${({ xl }) => xl && getWidthString(xl)}
  }
`

function getWidthString(span: number) {
  if (!span) {
    return
  }

  const width = (span / 12) * 100
  return `width: ${width}%;`
}
