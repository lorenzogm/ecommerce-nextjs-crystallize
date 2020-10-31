import React from 'react'

import { simplyFetchFromGraph } from 'lib/graph'
import ProductTemplate from 'components/templates/ProductTemplate/ProductTemplate'

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

  return { ...data, preview }
}

export default function ProductPage({ product, preview }) {
  return <ProductTemplate product={product} preview={preview} />
}
