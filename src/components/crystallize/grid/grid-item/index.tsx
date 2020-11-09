import React from 'react'

import Link from 'components/foundations/Link/Link'
import DocumentItem from 'components/crystallize/item-microformat/document-item'
import Image from 'components/foundations/Image/Image'
import Button from 'components/foundations/Button/Button'
import { useT } from 'lib/i18n'
import getImageSource from 'utils/getImageSource'

import { Text, Price, Title } from './styles'

export default function GridItem({ data }) {
  const t = useT()

  if (!data) {
    return null
  }

  const { name, path, type, variants, defaultVariant = {} } = data
  let image
  let text
  let variant

  if (type === 'folder' || type === 'document') {
    const images = data.components.find((c) => c.type === 'images')
    image = images?.content?.images?.[0]
    text = <Title>{name}</Title>
  } else {
    variant = variants ? variants.find((variant) => variant.isDefault) : defaultVariant
    image = getImageSource({
      path,
      fileName: variant.sku,
    })
    text = (
      <>
        <Price>{t('{{value, currency}}', { value: variant.price })}</Price>
        <Title>{name}</Title>
        <Button>{t('Buy')}</Button>
      </>
    )
  }

  if (type === 'document') {
    return <DocumentItem data={data} colSpan="1" />
  }

  return (
    <Link as={path} href="/[...catalogue]" passHref>
      <a>
        {image && (
          <div className="flex justify-center">
            <Image src={image} alt={name} width={300} height={300} />
          </div>
        )}
        <Text>{text}</Text>
      </a>
    </Link>
  )
}
