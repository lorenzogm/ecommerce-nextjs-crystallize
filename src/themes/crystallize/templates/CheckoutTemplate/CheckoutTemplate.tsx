import React from 'react'

import { useBasket } from 'contexts/BasketContext/BasketContext'
import Layout from 'themes/crystallize/components/layout'
import OrderItems from 'themes/crystallize/components/order-items'
import { Totals } from 'themes/crystallize/elements/BasketTotals/BasketTotals'
import { useT } from 'lib/i18n'

import Payment from './Payment'
import { Outer, Inner, SectionHeader, Container } from './CheckoutTemplate.styles'

export default function CheckoutTemplate() {
  const basket = useBasket()
  const t = useT()

  if (basket.status !== 'ready') {
    return <Outer center>{t('Loading...')}</Outer>
  }

  const { cart } = basket

  if (!cart?.length) {
    return <Outer center>{t('Your basket is empty', { context: 'inCheckout' })}</Outer>
  }

  return (
    <Layout title={t('Checkout')} simple>
      <Outer>
        <Inner>
          <Container>
            <SectionHeader>{t('Checkout')}</SectionHeader>
            <Payment />
          </Container>
          <Container>
            <SectionHeader>{t('Basket')}</SectionHeader>
            <OrderItems cart={cart} />
            <div style={{ padding: '0 15px' }}>
              <Totals />
            </div>
          </Container>
        </Inner>
      </Outer>
    </Layout>
  )
}
