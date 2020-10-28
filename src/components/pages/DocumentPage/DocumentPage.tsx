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

export default function DocumentPage({ document, preview, theme }) {
  const DocumentTemplate = dynamic(() => import(`themes/${theme}/templates/DocumentTemplate/DocumentTemplate`))

  return <DocumentTemplate document={document} preview={preview} />
}
