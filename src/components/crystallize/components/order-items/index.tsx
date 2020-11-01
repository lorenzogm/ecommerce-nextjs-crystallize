import React from 'react'
import AttributeList from 'components/crystallize/components/attribute-list'
import { CurrencyValue } from 'components/crystallize/components/currency-value'
import Image from 'components/foundations/Image/Image'

import { Item, ItemAmount, ItemInfo, ItemName, Items, ItemQuantity, ItemPrice } from './styles'

const OrderItems = ({ cart }) => (
  <Items>
    {cart.map(
      (item) =>
        item &&
        item.price && (
          <Item key={item.sku}>
            {item.images && <Image src={item.images[0].url} alt={item.name} width={75} height={75} />}
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

export default OrderItems
