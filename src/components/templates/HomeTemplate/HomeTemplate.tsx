import React from 'react'

import PageLayout from 'components/foundations/PageLayout/PageLayout'
import Grid, { GridItem } from 'components/crystallize/grid'

import { Outer } from './HomeTemplate.styles'

export default function HomeTemplate({ grid, preview }) {
  return (
    <PageLayout preview={preview}>
      <Outer>
        {grid && <Grid model={grid} cellComponent={({ cell }) => <GridItem data={cell.item} gridCell={cell} />} />}
      </Outer>
    </PageLayout>
  )
}
