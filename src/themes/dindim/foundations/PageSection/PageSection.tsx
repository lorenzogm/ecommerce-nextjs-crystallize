import styled from 'styled-components'

import { responsive } from 'themes/crystallize/ui'

export default styled.div`
  margin: 8px;
  padding: 16px;
  background: var(--color-box-background);

  ${responsive.smAndLess} {
    margin-bottom: 25px;
    padding: 0 40px 40px 40px;
  }
`
