import React from 'react'
import dynamic from 'next/dynamic'

import { simplyFetchFromGraph } from 'lib/graph'
import fragments from 'lib/graph/fragments'

const HomeTemplate = dynamic(
  () => import(`themes/${process.env.NEXT_PUBLIC_THEME || 'crystallize'}/templates/HomeTemplate/HomeTemplate`),
)

export default function IndexPage({ catalogue, preview }) {
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
