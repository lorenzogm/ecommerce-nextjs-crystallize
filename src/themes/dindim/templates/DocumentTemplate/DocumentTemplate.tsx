import React from 'react'
import ContentTransformer from 'themes/dindim/elements/content-transformer'

import { H1, Header, Outer } from 'themes/crystallize/ui'
import PageLayout from 'themes/dindim/foundations/PageLayout/PageLayout'
import ShapeComponents from 'themes/crystallize/components/shape/components'
import ItemMicroformat from 'themes/crystallize/components/item-microformat'
import { useT } from 'lib/i18n'

import { HeroImage, Img, List, H2, Related } from './DocumentTemplate.styles'

export default function DocumentTemplate({ document, preview }) {
  const t = useT()
  const title = document?.components.find((c) => c.name === 'Title')
  const description = document?.components.find((c) => c.name === 'Intro')
  const images = document?.components.find((c) => c.name === 'Image')
  const relatedProducts = document?.components?.find((c) => c.name === 'Products')

  const componentsRest = document?.components?.filter((c) => !['Intro', 'Title', 'Image', 'Products'].includes(c.name))

  return (
    <PageLayout title={title?.content?.text || document.name} preview={preview}>
      <Outer>
        <Header centerContent>
          <H1>{title.content.text}</H1>
          <ContentTransformer {...description?.content?.json} />
        </Header>
        <HeroImage>
          {images?.content?.images?.map((img, i) => (
            <Img key={img.url} {...img} alt={img.altText} sizes={i > 0 ? '40vw' : '80vw'} />
          ))}
        </HeroImage>
        <ShapeComponents components={componentsRest} />
      </Outer>
      {relatedProducts?.content?.items?.length && (
        <Related>
          <H2>
            {t('Related product', {
              count: relatedProducts.content.items.length,
            })}
          </H2>
          <List>
            {relatedProducts.content.items.map((item, i) => (
              <ItemMicroformat key={i} item={item} />
            ))}
          </List>
        </Related>
      )}
    </PageLayout>
  )
}
