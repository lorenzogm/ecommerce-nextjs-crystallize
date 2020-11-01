import React from 'react'
import AttributeList from 'components/crystallize/components/attribute-list'
import { CurrencyValue } from 'components/crystallize/components/currency-value'
import Image from 'components/foundations/Image/Image'
import getImageSource from 'utils/getImageSource'

import { Item, ItemAmount, ItemInfo, ItemName, Items, ItemQuantity, ItemPrice } from './styles'

export default function OrderItems({ cart }) {
  return (
    <Items>
      {cart.map(
        (item) =>
          item &&
          item.price && (
            <Item key={item.sku}>
              {item.images && (
                <Image
                  src={getImageSource({ path: item.path, fileName: item.sku })}
                  alt={item.name}
                  width={75}
                  height={75}
                />
              )}
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                {item.attributes ? <AttributeList attributes={item.attributes} /> : <p>{item.sku}</p>}
              </ItemInfo>
              <ItemAmount>
                <ItemQuantity>
                  {item.quantity} x <CurrencyValue value={item.price.gross} />
                </ItemQuantity>
                <ItemPrice>
                  <CurrencyValue value={item.price.gross * item.quantity} />
                </ItemPrice>
              </ItemAmount>
            </Item>
          ),
      )}
    </Items>
  )
}
