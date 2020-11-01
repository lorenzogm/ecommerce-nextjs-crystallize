import React from 'react'

import { H3 } from 'components/crystallize/ui'
import ContentTransformer from 'components/elements/content-transformer'
import Link from 'components/foundations/Link/Link'
import VideoPlayer from 'components/crystallize/components/video-player'
import Image from 'components/foundations/Image/Image'

import { Outer, Text, MediaWrapper, MediaInner, Description } from './styles'

export default function DocumentItem({ data, colSpan = '4' }) {
  if (!data) {
    return null
  }

  const { name, path } = data

  let image
  const images = data.components?.find((c) => c.type === 'images')
  image = images?.content?.images?.[0]
  const description = data.components?.find((c) => c.name === 'Intro')
  const video = data.components?.find((c) => c.name === 'Video')

  let media

  if (video?.content?.videos?.length) {
    media = <VideoPlayer {...video.content.videos[0]} autoplay loop controls={false} />
  } else if (image) {
    media = <Image src={image.url} alt={name} unsized />
  } else {
    return (
      <Link as={path} href="/[...catalogue]" passHref>
        <Outer span={colSpan}>
          <Text>
            <H3>{name}</H3>
            <Description>
              <ContentTransformer {...description?.content?.json} />
            </Description>
          </Text>
        </Outer>
      </Link>
    )
  }

  return (
    <Link as={path} href="/[...catalogue]" passHref>
      <Outer span={colSpan}>
        <MediaWrapper>
          <MediaInner>{media && media}</MediaInner>
        </MediaWrapper>
        <Text>
          <H3>{name}</H3>
          <Description>
            <ContentTransformer {...description?.content?.json} />
          </Description>
        </Text>
      </Outer>
    </Link>
  )
}
