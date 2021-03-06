import React from 'react'
import { useForm } from 'react-hook-form'

import { useBasket } from 'contexts/BasketContext/BasketContext'
import PageLayout from 'components/foundations/PageLayout/PageLayout'
import OrderItems from 'components/crystallize/components/order-items'
import { useT } from 'lib/i18n'
import Button from 'components/foundations/Button/Button'
import InputText from 'components/foundations/InputText/InputText'
import PageSection from 'components/foundations/PageSection/PageSection'
import PageSectionHeader from 'components/foundations/PageSectionHeader/PageSectionHeader'
import Form from 'components/foundations/Form/Form'
import DescriptionList from 'components/foundations/DescriptionList/DescriptionList'
import DescriptionListTerm from 'components/foundations/DescriptionListTerm/DescriptionListTerm'
import DescriptionListDetails from 'components/foundations/DescriptionListDetails/DescriptionListDetails'
import InputRadio from 'components/foundations/InputRadio/InputRadio'
import PreOrderSystemSummary from 'components/elements/PreOrderSystemSummary/PreOrderSystemSummary'
import { DELIVERY_PRICE } from 'config/constants'
import { DeliveryMethod } from 'types/deliveryTypes'

import { Outer } from './CheckoutTemplate.styles'
import useOnSubmit from './useOnSubmit'

export default function CheckoutTemplate() {
  const basket = useBasket()
  const t = useT()

  const defaultValues = {
    email: '',
    firstName: '',
    lastName: '',
    street: '',
    zip: '',
    city: '',
    country: 'España',
    deliveryMethod: undefined,
  }

  const useFormMethods = useForm({ defaultValues })
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { watch } = useFormMethods
  const { deliveryMethod } = watch()
  const deliveryPrice = deliveryMethod === DeliveryMethod.DELIVERY ? DELIVERY_PRICE : 0
  const { onSubmit } = useOnSubmit({ deliveryPrice })

  if (process.env.NEXT_PUBLIC_ENABLE_CHECKOUT !== 'true') {
    return null
  }

  if (basket.status !== 'ready') {
    return <Outer center>{t('Loading...')}</Outer>
  }

  if (!basket.cart?.length) {
    return (
      <PageLayout title={t('Checkout')}>
        <div className="flex flex-row">
          <div className="mx-auto w-full md:w-1/2">
            <PageSection style={{ textAlign: 'center' }}>
              {t('Your basket is empty', { context: 'inCheckout' })}
            </PageSection>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title={t('Checkout')}
      description={t('Review your products, provide your details and place your order.')}
      simple
    >
      <div className="flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-1/2">
          <PreOrderSystemSummary />

          <Form useFormMethods={useFormMethods} onSubmit={onSubmit}>
            <PageSection>
              <PageSectionHeader>{t('Delivery')}</PageSectionHeader>
              <p>
                {t(
                  'We are a small shop! If you know us and we have discussed how to give you the products, choose pickup to save delivery costs!',
                )}
              </p>

              <InputRadio
                name="deliveryMethod"
                label=""
                options={[
                  { label: t('Pickup'), value: DeliveryMethod.PICKUP },
                  { label: t('Delivery'), value: DeliveryMethod.DELIVERY },
                ]}
              />
            </PageSection>

            {deliveryMethod ? (
              <PageSection>
                <PageSectionHeader>{t('Contact Details')}</PageSectionHeader>

                <InputText type="email" name="email" label={t('Email')} required />

                <div className="flex flex-row">
                  <div className="w-1/2">
                    <InputText name="firstName" label={t('First Name')} required />
                  </div>
                  <div className="w-1/2">
                    <InputText name="lastName" label={t('Last Name')} required />
                  </div>
                </div>

                {deliveryMethod === DeliveryMethod.DELIVERY ? (
                  <>
                    <InputText name="street" label={t('Street')} required />

                    <div className="flex flex-row">
                      <div className="w-1/2">
                        <InputText name="postalCode" label={t('Postal Code')} required />
                      </div>
                      <div className="w-1/2">
                        <InputText name="city" label={t('City')} required />
                      </div>
                    </div>
                    <InputText name="country" label={t('Country')} required disabled />
                  </>
                ) : null}
                <Button type="submit">{t('Place Order')}</Button>
              </PageSection>
            ) : null}
          </Form>
        </div>

        <div className="w-full md:w-1/2">
          <PageSection>
            <PageSectionHeader>{t('Total')}</PageSectionHeader>
            <DescriptionList>
              <DescriptionListTerm>{t('Subtotal (VAT included)')}</DescriptionListTerm>
              <DescriptionListDetails>{t('{{value, currency}}', { value: basket.total.gross })}</DescriptionListDetails>

              <DescriptionListTerm>{t('Delivery')}</DescriptionListTerm>
              <DescriptionListDetails>
                {deliveryPrice === 0 ? t('Free') : t('{{value, currency}}', { value: deliveryPrice })}
              </DescriptionListDetails>

              <DescriptionListTerm>{t('Total')}</DescriptionListTerm>
              <DescriptionListDetails>
                {t('{{value, currency}}', { value: basket.total.gross + deliveryPrice })}
              </DescriptionListDetails>
            </DescriptionList>
          </PageSection>

          <PageSection>
            <PageSectionHeader>{t('Your bag')}</PageSectionHeader>
            <OrderItems cart={basket.cart} />
          </PageSection>
        </div>
      </div>
    </PageLayout>
  )
}
