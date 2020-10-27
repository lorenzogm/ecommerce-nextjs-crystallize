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
  Input,
  InputGroup,
  Label,
  PaymentSelector,
  PaymentProviders,
  PaymentButton,
  PaymentProvider,
  SectionHeader,
} from './CheckoutTemplate.styles'

const StripeCheckout = dynamic(() => import('./stripe'))

const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const Inner = styled.div``

export default function Payment() {
  const t = useT()
  const locale = useLocale()
  const router = useRouter()
  const { cart, actions, metadata } = useBasket()
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState(null)
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  const { firstName, lastName, email } = state

  // Define the shared payment model for all payment providers
  const paymentModel = {
    multilingualUrlPrefix: locale.urlPrefix ? `/${locale.urlPrefix}` : '',
    locale,
    cart,
    metadata,
    customer: {
      firstName,
      lastName,
      addresses: [
        {
          type: 'billing',
          email,
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
      <form noValidate>
        <Row>
          <InputGroup>
            <Label htmlFor="firstname">{t('First Name')}</Label>
            <Input
              name="firstname"
              type="text"
              value={firstName}
              onChange={(e) => setState({ ...state, firstName: e.target.value })}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="lastname">{t('Last Name')}</Label>
            <Input
              name="lastname"
              type="text"
              value={lastName}
              onChange={(e) => setState({ ...state, lastName: e.target.value })}
              required
            />
          </InputGroup>
        </Row>
        <Row>
          <InputGroup>
            <Label htmlFor="email">{t('Email')}</Label>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              required
            />
          </InputGroup>
        </Row>
      </form>

      <div>
        <SectionHeader>{t('Choose payment method')}</SectionHeader>
        {appConfig.paymentProviders.length === 0 ? (
          <i>{t('No payment providers are configured')}</i>
        ) : (
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
        )}
      </div>
    </Inner>
  )
}
