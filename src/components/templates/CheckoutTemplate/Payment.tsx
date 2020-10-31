/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import styled from 'styled-components'

import appConfig, { useLocale } from 'lib/app-config'
import { useT } from 'lib/i18n'
import { useBasket } from 'contexts/BasketContext/BasketContext'

import {
  PaymentSelector,
  PaymentProviders,
  PaymentButton,
  PaymentProvider,
  SectionHeader,
} from './CheckoutTemplate.styles'

const StripeCheckout = dynamic(() => import('./stripe'))

const Inner = styled.div``

export default function Payment({ state }) {
  const t = useT()
  const locale = useLocale()
  const router = useRouter()
  const { cart, actions, metadata } = useBasket()
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState(null)

  // Define the shared payment model for all payment providers
  const paymentModel = {
    multilingualUrlPrefix: locale.urlPrefix ? `/${locale.urlPrefix}` : '',
    locale,
    cart,
    metadata,
    customer: {
      firstName: state.firstName,
      lastName: state.lastName,
      addresses: [
        {
          type: 'billing',
          email: state.email,
        },
      ],
    },
  }

  const paymentProviders = [
    {
      name: 'stripe',
      color: '#6773E6',
      logo: '/static/stripe-logo.png',
      render: () => (
        <PaymentProvider>
          <Head>
            <script key="stripe-js" src="https://js.stripe.com/v3/" async />
          </Head>
          <StripeCheckout
            paymentModel={paymentModel}
            onSuccess={(orderId) => {
              router.push('/confirmation/stripe/[orderId]', `/confirmation/stripe/${orderId}`)
              scrollTo(0, 0)
            }}
          />
        </PaymentProvider>
      ),
    },
  ]

  return (
    <Inner>
      <div>
        <SectionHeader>{t('Payment')}</SectionHeader>
        <p>
          {t("The payment method is via wire transfer. We'll provide you the bank account in the confirmation email")}
        </p>
        {appConfig.paymentProviders.length > 0 ? (
          <PaymentProviders>
            <PaymentSelector>
              {appConfig.paymentProviders.map((paymentProviderFromConfig) => {
                const paymentProvider = paymentProviders.find((p) => p.name === paymentProviderFromConfig)
                if (!paymentProvider) {
                  return (
                    <small>
                      {t('Payment provider {{name}} is not configured', {
                        name: paymentProviderFromConfig,
                      })}
                    </small>
                  )
                }

                return (
                  <PaymentButton
                    key={paymentProvider.name}
                    color={paymentProvider.color}
                    type="button"
                    selected={selectedPaymentProvider === paymentProvider.name}
                    onClick={() => setSelectedPaymentProvider(paymentProvider.name)}
                  >
                    <img
                      src={paymentProvider.logo}
                      alt={t('Logo for {{name}}', {
                        name: paymentProvider.name,
                      })}
                    />
                  </PaymentButton>
                )
              })}
            </PaymentSelector>

            {paymentProviders.find((p) => p.name === selectedPaymentProvider)?.render()}
          </PaymentProviders>
        ) : null}
      </div>
    </Inner>
  )
}
