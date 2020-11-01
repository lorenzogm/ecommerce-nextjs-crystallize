import React, { useEffect, useState } from 'react'

import AttributeList from 'components/crystallize/components/attribute-list'
import { CurrencyValue } from 'components/crystallize/components/currency-value'
import { useT } from 'lib/i18n'
import Image from 'components/foundations/Image/Image'
import getImageSource from 'utils/getImageSource'

import {
  Item,
  Row,
  ItemInfo,
  PriceWrapper,
  ItemName,
  ItemQuantityChanger,
  ItemQuantity,
  ItemDelete,
  PriceWrap,
  Price,
  PriceVat,
  drawAttentionDuration,
} from './BasketTinyItem.styles'

export default function TinyBasketItem({ actions, item }) {
  const t = useT()
  const [drawAttention, setDrawAttention] = useState(false)

  const { attributes, addItemTime } = item

  // Draw users attention when the item is added to the basket
  useEffect(() => {
    setDrawAttention(true)

    const timeout = setTimeout(() => setDrawAttention(false), drawAttentionDuration)
    return () => clearTimeout(timeout)
  }, [addItemTime])

  function increment() {
    actions.incrementItem(item)
  }

  function decrement() {
    actions.decrementItem(item)
  }

  function remove() {
    actions.removeItem(item)
  }

  return (
    <Item animate={drawAttention}>
      <Image src={getImageSource({ path: item.path, fileName: item.sku })} alt={item.name} unsized />
      <ItemInfo>
        <Row>
          <ItemName>{item.name}</ItemName>
          {attributes?.length > 0 && <AttributeList attributes={attributes} />}
        </Row>

        <PriceWrapper>
          <PriceWrap>
            <Price>
              <CurrencyValue value={item.price?.gross} />
            </Price>
          </PriceWrap>

          <PriceVat>
            <span>{t('VAT: {{value, currency}}', { value: item.price?.vat })}</span>
          </PriceVat>
        </PriceWrapper>
      </ItemInfo>
      <div>
        <ItemQuantityChanger>
          <button onClick={decrement} type="button" disabled={item.quantity === 1}>
            -
          </button>
          <ItemQuantity>{item.quantity}</ItemQuantity>
          <button onClick={increment} type="button">
            +
          </button>
        </ItemQuantityChanger>
      </div>
      <ItemDelete onClick={remove}>{t('Remove {{name}} from basket', item)}</ItemDelete>
    </Item>
  )
}
