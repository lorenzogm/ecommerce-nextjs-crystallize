import React, { useState } from 'react'

import ContentTransformer from 'components/elements/content-transformer'
import Image from 'components/foundations/Image/Image'
import PageLayout from 'components/foundations/PageLayout/PageLayout'
import ShapeComponents from 'components/crystallize/components/shape/components'
import Topics from 'components/crystallize/topics'

import VariantSelector from './VariantSelector'
import Buy from './Buy'

import { Name, Info, Summary, Content, Specs, Description } from './ProductTemplate.styles'

export default function ProductTemplate({ product, preview }) {
  // Set the selected variant to the default
  const [selectedVariant, setSelectedVariant] = useState(product.variants.find((v) => v.isDefault))

  function onVariantChange(variant) {
    setSelectedVariant(variant)
  }

  const summaryComponent = product.components && product.components.find((c) => c.name === 'Summary')
  const descriptionComponent = product.components && product.components.find((c) => c.name === 'Description')
  const specs = product.components && product.components.find((c) => c.name === 'Specs')
  const componentsRest =
    product.components && product.components?.filter((c) => !['Summary', 'Description', 'Specs'].includes(c.name))

  return (
    <PageLayout title={product.name} imageUrl={selectedVariant.image.url} preview={preview}>
      <div className="flex flex-col-reverse md:flex-row">
        <div className=" w-full md:w-1/2">
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
        </div>
        <div className=" w-full md:w-1/2">
          <Image src={selectedVariant.image.url} alt={product.name} width={500} height={500} />
        </div>
      </div>
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
    </PageLayout>
  )
}
