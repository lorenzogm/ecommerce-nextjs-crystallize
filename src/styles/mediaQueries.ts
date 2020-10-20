import breakpoints from './breakpoints'

const mediaQueries = {
  xs: `only screen and (max-width: ${breakpoints.sm}px)`,
  sm: `only screen and (max-width: ${breakpoints.md}px)`,
  md: `only screen and (max-width: ${breakpoints.lg}px)`,
  lg: `only screen and (max-width: ${breakpoints.xl}px)`,
  xl: `only screen and (max-width: ${breakpoints.xl}px)`,
}

export default mediaQueries
