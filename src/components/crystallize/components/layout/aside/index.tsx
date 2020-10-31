import React, { useState } from 'react'
import styled from 'styled-components'

import Link from 'components/crystallize/components/link'
import { useBasket, TinyBasket } from 'contexts/BasketContext/BasketContext'
import Button from 'components/foundations/Button/Button'
import { useT } from 'lib/i18n'

import { Basket, Header, Footer } from './styles'

export default function Aside() {
  const t = useT()
  const basket = useBasket()
  const [going, setGoing] = useState(false)

  const onCheckoutClick = (evt) => {
    if (!basket.cart.length) {
      evt.preventDefault()
      return
    }
    setGoing(true)
  }

  if (basket.status !== 'ready') {
    return t('Loading...')
  }

  return (
    <Basket>
      <Header>{t('Basket')}</Header>
      <TinyBasket />
      <Footer>
        <Link href="/checkout" passHref>
          <Button as="a" state={going ? 'loading' : null} disabled={!basket.cart.length} onClick={onCheckoutClick}>
            {t('Go to checkout')}
          </Button>
        </Link>
      </Footer>
    </Basket>
  )
}
