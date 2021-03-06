import React from 'react'
import { LayoutContext } from '@crystallize/react-layout'

import { useBasket } from 'contexts/BasketContext/BasketContext'
import IconBasket from 'components/crystallize/ui/icons/basket'

import { Basket, BasketQuantity } from './styles'

const BasketButton = () => {
  const { status, total } = useBasket()
  const layout = React.useContext(LayoutContext)

  if (status === 'ready') {
    return (
      <Basket onClick={layout?.actions?.showRight} type="button">
        <IconBasket />
        <BasketQuantity>{total.quantity}</BasketQuantity>
      </Basket>
    )
  }

  return (
    <Basket type="button">
      <IconBasket />
      <BasketQuantity />
    </Basket>
  )
}

export default BasketButton
