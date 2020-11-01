import React from 'react'

import Link from 'components/foundations/Link/Link'
import { screen, H3 } from 'components/crystallize/ui'
import Image from 'components/foundations/Image/Image'

import { Outer, Text, ImageWrapper } from './styles'

export default function FolderItem({ data, gridCell }) {
  if (!data) {
    return null
  }

  const { name, path } = data
  const imageMdWidth = 100 / (gridCell?.layout?.colspan ?? 1)

  let image

  const images = data.components.find((c) => c.type === 'images')
  image = images?.content?.images?.[0]

  return (
    <Link as={path} href="/[...catalogue]" passHref>
      <Outer>
        <ImageWrapper>
          {image && <Image src={image.url} alt={name} width={imageMdWidth} height={imageMdWidth} />}
        </ImageWrapper>
        <Text>
          <H3>{name}</H3>
        </Text>
      </Outer>
    </Link>
  )
}
