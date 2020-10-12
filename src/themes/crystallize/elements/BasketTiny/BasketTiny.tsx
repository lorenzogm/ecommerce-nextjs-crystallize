import React from 'react';

import { useT } from 'lib/i18n';

import { useBasket } from 'contexts/BasketContext/BasketContext';
import { Totals } from 'themes/crystallize/elements/BasketTotals/BasketTotals';
import BasketTinyItem from 'themes/crystallize/elements/BasketTinyItem/BasketTinyItem';

import { Outer, Items, ItemOuter, BasketIsEmpty } from './BasketTiny.styles';

export function TinyBasket() {
  const t = useT();
  const { status, cart, actions } = useBasket();

  if (status !== 'ready') {
    return null;
  }

  if (!cart?.length) {
    return (
      <Outer>
        <BasketIsEmpty>{t('basket.empty')}</BasketIsEmpty>
      </Outer>
    );
  }

  return (
    <Outer>
      <Items>
        {cart.map((item) => (
          <ItemOuter key={item.sku} item={item}>
            <BasketTinyItem item={item} actions={actions} />
          </ItemOuter>
        ))}
      </Items>
      <div style={{ height: 15 }} />
      <Totals />
    </Outer>
  );
}
