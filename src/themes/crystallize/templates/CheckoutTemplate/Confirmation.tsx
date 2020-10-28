import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import is from 'styled-is'

import Layout from 'themes/crystallize/components/layout'
import { useBasket } from 'contexts/BasketContext/BasketContext'
import OrderItems from 'themes/crystallize/components/order-items'
import { H1, H3, Outer, Header } from 'themes/crystallize/ui'
import { useT } from 'lib/i18n'
import { CurrencyValue } from 'themes/crystallize/components/currency-value'

import BillingDetails from './BillingDetails'

const CustomHeader = styled(Header)`
  margin-bottom: 0;
  padding-bottom: 0;
`

const Line = styled.div`
  margin: 20px 0;
  border-bottom: 1px solid var(--color-main-background);
`

const Totals = styled.div`
  margin: 10px 15px;
`

const TotalLine = styled.div`
  text-align: right;
  margin-top: 5px;

  ${is('bold')`
    font-size: 1.2rem;
    font-weight: 600;
  `};
`

export default function Confirmation({ order: orderData }) {
  const basket = useBasket()
  const t = useT()

  const [emptied, setEmptied] = useState(false)

  useEffect(() => {
    if (!emptied) {
      basket.actions.empty()
      setEmptied(true)
    }
  }, [emptied, basket.actions])

  const order = orderData.data.orders?.get

  useEffect(() => {
    if (!order) {
      const t = setTimeout(() => window.location.reload(), 5000)

      return () => clearTimeout(t)
    }
  }, [order])

  if (!order) {
    return <Layout loading />
  }

  const cart = order.cart.map((item) => ({
    ...item,
    image: {
      url: item.imageUrl,
    },
  }))
  const email = order.customer.addresses?.[0]?.email
  const { total } = order

  return (
    <Layout title={t('Order confirmation')}>
      <Outer>
        <CustomHeader>
          <H1>{t('Order confirmation')}</H1>
          <p>
            {t('Your order has been confirmed.', {
              context: email ? 'withEmail' : null,
              email,
            })}
          </p>
          <Line />
          <BillingDetails order={order} />
          <Line />
          <H3>{t('Order item', { count: cart.length })}</H3>
          <OrderItems cart={cart} />
          <Totals>
            <TotalLine bold>
              {t('Total')}: <CurrencyValue value={total.gross} />
            </TotalLine>
            <TotalLine>
              {t('VAT: {{value, currency}}', {
                value: total.gross - total.net,
              })}
            </TotalLine>
          </Totals>
        </CustomHeader>
      </Outer>
    </Layout>
  )
}
