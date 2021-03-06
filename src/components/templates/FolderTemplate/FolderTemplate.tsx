import React from 'react'

import { Outer, Header, H1 } from 'components/crystallize/ui'
import PageLayout from 'components/foundations/PageLayout/PageLayout'
import Grid, { GridItem } from 'components/crystallize/grid'
import ShapeComponents from 'components/crystallize/components/shape/components'
import ItemMicroformat from 'components/crystallize/item-microformat'

import { List } from './FolderTemplate.styles'

export default function FolderTemplate({ folder, preview }) {
  const { children } = folder

  const gridRelations = folder.components
    ?.filter((c) => c.type === 'gridRelations')
    ?.reduce((acc, g) => [...acc, ...(g?.content?.grids || [])], [])
  const metaTitle = folder.components.find((c) => c.name === 'Meta Title')
  const metaDescription = folder.components.find((c) => c.name === 'Meta Description')
  const rest = folder.components?.filter(
    (c) => c.type !== 'gridRelations' && c.name !== 'Meta Title' && c.name !== 'Meta Description',
  )

  return (
    <PageLayout title={metaTitle.content.text} description={metaDescription.content.text} preview={preview}>
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
