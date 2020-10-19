import React from 'react'
import dynamic from 'next/dynamic'

import { simplyFetchFromGraph } from 'lib/graph'
import fragments from 'lib/graph/fragments'
import appConfig, { getLocaleFromContext } from 'lib/app-config'
import { GetStaticPaths } from 'next'

const HomeTemplate = dynamic(
  () => import(`themes/${process.env.NEXT_PUBLIC_THEME || 'crystallize'}/templates/HomeTemplate/HomeTemplate`),
)

export default function IndexPage({ catalogue, preview }) {
  const [grid] = catalogue?.components?.find((c) => c.type === 'gridRelations')?.content?.grids || []

  return <HomeTemplate grid={grid} preview={preview} />
}

export async function getData({ language, preview = null }) {
  try {
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
        language,
        path: '/web-frontpage',
        version: preview ? 'draft' : 'published',
      },
    })
    return { ...data, preview }
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getStaticProps({ params = {}, preview }) {
  const locale = getLocaleFromContext(params)

  const data = await getData({
    asPath: '/',
    language: locale.crystallizeCatalogueLanguage,
    preview,
  })

  return {
    props: {
      ...data,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: appConfig.locales.map((l) => `/${l.urlPrefix}`),
    fallback: false,
  }
}
