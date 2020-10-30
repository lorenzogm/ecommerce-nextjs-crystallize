import { useCallback } from 'react'

import { useBasket } from 'contexts/BasketContext/BasketContext'
import { doPost } from 'lib/rest-api/helpers'
import { useRouter } from 'next/router'
import { DELIVERY_TAX } from 'themes/dindim/config/constants'

type UseOnSubmit = {
  deliveryPrice: number
}

export default function useOnSubmit({ deliveryPrice }: UseOnSubmit) {
  const basket = useBasket()
  const router = useRouter()

  const onSubmit = useCallback((values) => {
    const order = {
      cart: basket.cart.map((product) => ({
        name: product.name || product.sku,
        sku: product.sku,
        productId: product.id,
        productVariantId: product.priceVariantIdentifier,
        imageUrl: product.images[0].url,
        quantity: product.quantity,
        price: {
          currency: product.price.currency,
          tax: product.vatType + deliveryPrice * DELIVERY_TAX,
          net: product.price.net + deliveryPrice * (1 - DELIVERY_TAX),
          gross: product.price.gross + deliveryPrice,
        },
      })),
      total: {
        gross: basket.total.gross,
        currency: 'EUR',
      },
      customer: {
        firstName: values.firstName,
        lastName: values.lastName,
        addresses: [
          {
            type: 'billing',
            email: values.email,
            street: values.street,
            streetNumber: values.streetNumber,
            postalCode: values.postalCode,
            city: values.city,
            country: values.country,
          },
          {
            type: 'delivery',
            email: values.email,
            street: values.street,
            streetNumber: values.streetNumber,
            postalCode: values.postalCode,
            city: values.city,
            country: values.country,
          },
        ],
      },
    }

    if (process.env.NEXT_PUBLIC_ENABLE_CHECKOUT === 'true') {
      doPost('/api/crystallize-create-order', {
        body: JSON.stringify({
          order,
          deliveryMethod: values.deliveryMethod,
        }),
      }).then(() => {
        basket.actions.empty()
        router.push('/checkout/success')
      })
    }
  }, [])

  return { onSubmit }
}
