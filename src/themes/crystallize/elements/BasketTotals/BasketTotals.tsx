import React from 'react'

import { useT } from 'lib/i18n'
import { useBasket } from 'contexts/BasketContext/BasketContext'

import { Outer, Row, Rows } from './BasketTotals.styles'

export const Totals = () => {
  const t = useT()
  const { total } = useBasket()

  return (
    <Outer>
      <Rows>
        <Row modifier="total-price">
          <span>{t('Total price')}:</span>
          <span>{t('{{value, currency}}', { value: total.net })}</span>
        </Row>
        {/* {discount && (
          <>
            <Row modifier="discount">
              <span>{t('Discount')}:</span>
              <span>{t('{{value, currency}}', { value: discount })}</span>
            </Row>
            <Row modifier="total-after-discount">
              <span>{t('common.totalPriceAfterDiscount')}:</span>
              <span>
                {t('{{value, currency}}', { value: totalPriceMinusDiscount })}
              </span>
            </Row>
          </>
        )} */}

        <Row modifier="total-vat">
          <span>{t('VAT')}:</span>
          <span>{t('{{value, currency}}', { value: total.vat })}</span>
        </Row>
        <Row modifier="to-pay">
          <span>{t('To pay')}:</span>
          <span>{t('{{value, currency}}', { value: total.gross })}</span>
        </Row>
      </Rows>
    </Outer>
  )
}
