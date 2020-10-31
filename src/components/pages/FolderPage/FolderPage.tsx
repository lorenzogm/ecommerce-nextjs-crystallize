import React from 'react'

import { simplyFetchFromGraph } from 'lib/graph'
import FolderTemplate from 'components/templates/FolderTemplate/FolderTemplate'

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

export default function FolderPage({ folder, preview }) {
  return <FolderTemplate folder={folder} preview={preview} />
}
