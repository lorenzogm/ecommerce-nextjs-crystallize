import React from 'react'
import dynamic from 'next/dynamic'

import { simplyFetchFromGraph } from 'lib/graph'
import fragments from 'lib/graph/fragments'
import appConfig from 'app.config.json'

type IndexPageProps = {
  theme: string
  preview: boolean
}
export default function IndexPage({ catalogue, preview, theme }: IndexPageProps) {
  const [grid] = catalogue?.components?.find((c) => c.type === 'gridRelations')?.content?.grids || []

  const HomeTemplate = dynamic(() => import(`themes/${theme}/templates/HomeTemplate/HomeTemplate`))

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

  const theme = process.env.THEME || appConfig.theme.default

  return {
    props: {
      theme,
      catalogue: data.catalogue,
      preview,
    },
    revalidate: 1,
  }
}
