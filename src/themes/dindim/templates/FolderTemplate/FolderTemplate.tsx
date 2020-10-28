import React from 'react'

import { Outer, Header, H1 } from 'themes/crystallize/ui'
import PageLayout from 'themes/dindim/foundations/PageLayout/PageLayout'
import Grid, { GridItem } from 'themes/crystallize/components/grid'
import ShapeComponents from 'themes/crystallize/components/shape/components'
import ItemMicroformat from 'themes/dindim/crystallize/item-microformat'

import { List } from './FolderTemplate.styles'

export default function FolderTemplate({ folder, preview }) {
  const { children } = folder

  const gridRelations = folder.components
    ?.filter((c) => c.type === 'gridRelations')
    ?.reduce((acc, g) => [...acc, ...(g?.content?.grids || [])], [])
  const rest = folder.components?.filter((c) => c.type !== 'gridRelations')

  return (
    <PageLayout title={folder.name} preview={preview}>
      <Outer>
        <Header centerContent>
          <H1>{folder.name}</H1>
          <ShapeComponents components={rest} />
        </Header>
        {gridRelations?.length > 0
          ? gridRelations?.map((grid, index) => (
              <Grid
                key={index}
                model={grid}
                cellComponent={({ cell }) => <GridItem data={cell.item} gridCell={cell} />}
              />
            ))
          : children && (
              <List>
                {children.map((item, i) => (
                  <ItemMicroformat item={item} key={i} />
                ))}
              </List>
            )}
      </Outer>
    </PageLayout>
  )
}
