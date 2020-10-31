import React from 'react'

import { simplyFetchFromGraph } from 'lib/graph'
import fragments from 'lib/graph/fragments'
import HomeTemplate from 'components/templates/HomeTemplate/HomeTemplate'

type IndexPageProps = {
  preview: boolean
}
export default function IndexPage({ catalogue, preview }: IndexPageProps) {
  const [grid] = catalogue?.components?.find((c) => c.type === 'gridRelations')?.content?.grids || []

  return <HomeTemplate grid={grid} preview={preview} />
}

export async function getStaticProps({ preview = false }) {
  const { data } = await simplyFetchFromGraph({
    query: `
        query FRONTPAGE($language: String!, $path: String!,  $version: VersionLabel!) {
          catalogue(path: $path, language: $language, version: $version) {
            ...item
            ...product
          }
        }

        ${fragments}
      `,
    variables: {
      language: 'es',
      path: '/web-frontpage',
      version: preview ? 'draft' : 'published',
    },
  })

  return {
    props: {
      catalogue: data.catalogue,
      preview,
    },
    revalidate: 1,
  }
}
