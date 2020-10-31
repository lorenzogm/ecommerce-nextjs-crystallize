import React from 'react'
import { simplyFetchFromGraph } from 'lib/graph'
import DocumentTemplate from 'components/templates/DocumentTemplate/DocumentTemplate'

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

export default function DocumentPage({ document, preview }) {
  return <DocumentTemplate document={document} preview={preview} />
}
