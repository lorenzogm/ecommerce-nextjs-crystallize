import React from 'react'

import PageLayout from 'themes/dindim/foundations/PageLayout/PageLayout'
import Grid, { GridItem } from 'themes/crystallize/components/grid'
import { useT } from 'lib/i18n'

import { Outer } from './HomeTemplate.styles'

export default function HomeTemplate({ grid, preview }) {
  const t = useT()

  return (
    <PageLayout title={t('frontpage.title')} preview={preview}>
      <Outer>
        {grid && <Grid model={grid} cellComponent={({ cell }) => <GridItem data={cell.item} gridCell={cell} />} />}
      </Outer>
    </PageLayout>
  )
}
