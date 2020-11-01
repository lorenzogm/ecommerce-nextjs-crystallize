import React from 'react'

import { simplyFetchFromGraph } from 'lib/graph'
import FolderTemplate from 'components/templates/FolderTemplate/FolderTemplate'
import fileDownload from 'components/pages/FolderPage/downloadFile'

import query from './query'
import downloadProductImages from './downloadProductImages'

export async function getData({ fs, asPath, language, preview = null }) {
  const { data } = await simplyFetchFromGraph({
    query,
    variables: {
      path: asPath,
      language,
      version: preview ? 'draft' : 'published',
    },
  })

  if (process.env.NODE_ENV === 'development') {
    downloadProductImages({ fs, children: data.folder.children })
  }

  return {
    ...data,
    preview,
  }
}

export default function FolderPage({ folder, preview }) {
  return <FolderTemplate folder={folder} preview={preview} />
}
