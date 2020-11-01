import React from 'react'

import Link from 'components/foundations/Link/Link'
import { useT } from 'lib/i18n'
import { H3 } from 'components/crystallize/ui'
import Image from 'components/foundations/Image/Image'
import getImageSource from 'utils/getImageSource'

import { Outer, Text, Price, Inner } from './styles'

export default function ProductItem({ data }) {
  const t = useT()

  if (!data) {
    return null
  }
  const { name, path, type, variants } = data
  const variant = variants ? variants.find((variant) => variant.isDefault) : {}

  return (
    <Link as={path} href="/[...catalogue]" passHref>
      <Outer type={type}>
        <Inner>
          {variant.image && (
            <div className="flex justify-center">
              <Image src={getImageSource({ path, fileName: variant.sku })} alt={name} width={250} height={250} />
            </div>
          )}

          <Text>
            <Price>{t('{{value, currency}}', { value: variant.price })}</Price>
            <H3>{name}</H3>
          </Text>
        </Inner>
      </Outer>
    </Link>
  )
}
