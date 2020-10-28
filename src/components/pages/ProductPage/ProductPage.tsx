import React from 'react'
import dynamic from 'next/dynamic'

import { simplyFetchFromGraph } from 'lib/graph'
import appConfig from 'app.config.json'

import query from './query'

export async function getData({ asPath, language, preview = null }) {
  const { data } = await simplyFetchFromGraph({
    query,
    variables: {
      path: asPath,
      language,
      version: preview ? 'draft' : 'published',
    },
  })

  const theme = process.env.THEME || appConfig.theme.default
  return { ...data, preview, theme }
}

export default function ProductPage({ product, preview, theme }) {
  const ProductTemplate = dynamic(() => import(`themes/${theme}/templates/ProductTemplate/ProductTemplate`))

  return <ProductTemplate product={product} preview={preview} />
}
