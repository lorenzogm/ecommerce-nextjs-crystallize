import Link from 'components/foundations/Link/Link'
import navigation from 'config/navigation'

import { Nav, NavList, NavListItem } from './Navigation.styles'

export default function Navigation({ navOpen, setNavOpen }) {
  return (
    <Nav open={navOpen}>
      <NavList>
        {navigation.map((category) => (
          <NavListItem key={category.path}>
            <Link as={category.path} href="/[...catalogue]">
              <a onClick={() => setNavOpen(false)}>{category.name}</a>
            </Link>
          </NavListItem>
        ))}
      </NavList>
    </Nav>
  )
}
