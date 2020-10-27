import React from 'react'

import Layout from 'themes/crystallize/components/layout'
import Grid, { GridItem } from 'themes/crystallize/components/grid'
import { useT } from 'lib/i18n'

import { Outer } from './HomeTemplate.styles'

export default function HomeTemplate({ grid, preview }) {
  const t = useT()

  return (
    <Layout title={t('Home')} preview={preview}>
      <Outer>
        {grid && <Grid model={grid} cellComponent={({ cell }) => <GridItem data={cell.item} gridCell={cell} />} />}
      </Outer>
    </Layout>
  )
}
