import React from 'react'

import PageLayout from 'components/foundations/PageLayout/PageLayout'
import Grid, { GridItem } from 'components/crystallize/grid'
import { useT } from 'lib/i18n'

import { Outer } from './HomeTemplate.styles'

export default function HomeTemplate({ grid, preview }) {
  const t = useT()

  return (
    <PageLayout preview={preview}>
      <Outer>
        {grid && <Grid model={grid} cellComponent={({ cell }) => <GridItem data={cell.item} gridCell={cell} />} />}
      </Outer>
    </PageLayout>
  )
}
