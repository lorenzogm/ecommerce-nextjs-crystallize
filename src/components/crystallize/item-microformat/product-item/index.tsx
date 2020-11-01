import React from 'react'

import Link from 'components/foundations/Link/Link'
import { useT } from 'lib/i18n'
import { H3 } from 'components/crystallize/ui'
import Image from 'components/foundations/Image/Image'

import { Outer, Text, ImageWrapper, Price, Inner } from './styles'

export default function ProductItem({ data }) {
  const t = useT()

  if (!data) {
    return null
  }
  const { name, path, type, variants } = data
  const { price, image } = variants ? variants.find((variant) => variant.isDefault) : {}

  return (
    <Link as={path} href="/[...catalogue]" passHref>
      <Outer type={type}>
        <Inner>
          <ImageWrapper>{image && <Image src={image.url} alt={name} width={250} height={250} />}</ImageWrapper>

          <Text>
            <Price>{t('{{value, currency}}', { value: price })}</Price>
            <H3>{name}</H3>
          </Text>
        </Inner>
      </Outer>
    </Link>
  )
}
