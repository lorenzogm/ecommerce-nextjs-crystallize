import React, { useState } from 'react'
import Img from '@crystallize/react-image'
import ContentTransformer from 'themes/dindim/elements/content-transformer'

import { screen } from 'themes/crystallize/ui'
import PageLayout from 'themes/dindim/foundations/PageLayout/PageLayout'
import ShapeComponents from 'themes/crystallize/components/shape/components'

import Topics from 'themes/dindim/modules/topics'
import VariantSelector from './VariantSelector'
import Buy from './Buy'

import {
  Outer,
  Sections,
  Media,
  MediaInner,
  Name,
  Info,
  Summary,
  Content,
  Specs,
  Description,
} from './ProductTemplate.styles'

export default function ProductTemplate({ product, preview }) {
  // Set the selected variant to the default
  const [selectedVariant, setSelectedVariant] = useState(product.variants.find((v) => v.isDefault))

  function onVariantChange(variant) {
    setSelectedVariant(variant)
  }

  const summaryComponent = product.components.find((c) => c.name === 'Summary')
  const descriptionComponent = product.components.find((c) => c.name === 'Description')
  const specs = product.components.find((c) => c.name === 'Specs')
  const componentsRest = product.components?.filter((c) => !['Summary', 'Description', 'Specs'].includes(c.name))

  console.log(componentsRest)

  return (
    <PageLayout title={product.name} imageUrl={selectedVariant.image.url} preview={preview}>
      <Outer>
        <Sections>
          <Media>
            <MediaInner>
              <Img {...selectedVariant.image} sizes={`(max-width: ${screen.sm}px) 400px, 60vw`} alt={product.name} />
            </MediaInner>
          </Media>
          <Info>
            <Name>{product.name}</Name>
            {summaryComponent && (
              <Summary>
                <ContentTransformer {...summaryComponent?.content?.json} />
              </Summary>
            )}

            {product.variants?.length > 1 && (
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onVariantChange={onVariantChange}
              />
            )}

            <Buy product={product} selectedVariant={selectedVariant} />
          </Info>
        </Sections>
        <Content>
          {descriptionComponent && (
            <Description>
              <ShapeComponents className="description" components={[descriptionComponent]} />
            </Description>
          )}
          {specs && (
            <Specs>
              <ShapeComponents components={[specs]} />
            </Specs>
          )}
        </Content>

        <ShapeComponents components={componentsRest} />

        {product?.topics?.length && <Topics topicMaps={product.topics} />}
      </Outer>
    </PageLayout>
  )
}
