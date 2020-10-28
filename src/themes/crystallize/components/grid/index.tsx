import GridRenderer from '@crystallize/grid-renderer'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

import { responsive } from 'themes/crystallize/ui'

export const GridItem = dynamic(
  () => import(`themes/${process.env.NEXT_PUBLIC_THEME || 'crystallize'}/components/grid/grid-item`),
)

const StyledGrid = styled(GridRenderer)`
  grid-gap: 20px;
  grid-template-rows: 700px;

  ${responsive.xs} {
    display: block !important;
    grid-template-columns: 100% !important;
  }
`

export default function Grid({ model, ...rest }) {
  if (!model) {
    return null
  }

  return <StyledGrid model={model} {...rest} />
}
