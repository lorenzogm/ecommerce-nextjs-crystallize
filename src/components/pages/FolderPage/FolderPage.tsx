import React from 'react'
import dynamic from 'next/dynamic'

import { simplyFetchFromGraph } from 'lib/graph'

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

  const theme = process.env.THEME || 'crystallize'
  return { ...data, preview, theme }
}

export default function FolderPage({ folder, preview, theme }) {
  const FolderTemplate = dynamic(() => import(`themes/${theme}/templates/FolderTemplate/FolderTemplate`))

  return <FolderTemplate folder={folder} preview={preview} />
}
