import React from 'react'
import { useForm } from 'react-hook-form'

import { useBasket } from 'contexts/BasketContext/BasketContext'
import PageLayout from 'themes/dindim/foundations/PageLayout/PageLayout'
import OrderItems from 'themes/crystallize/components/order-items'
import { useT } from 'lib/i18n'
import Button from 'themes/dindim/foundations/Button/Button'
import InputText from 'themes/dindim/foundations/InputText/InputText'
import PageSection from 'themes/dindim/foundations/PageSection/PageSection'
import PageSectionHeader from 'themes/dindim/foundations/PageSectionHeader/PageSectionHeader'
import Form from 'themes/dindim/foundations/Form/Form'
import PageRow from 'themes/dindim/foundations/PageRow/PageRow'
import PageColumn from 'themes/dindim/foundations/PageColumn/PageColumn'
import DescriptionList from 'themes/dindim/foundations/DescriptionList/DescriptionList'
import DescriptionListTerm from 'themes/dindim/foundations/DescriptionListTerm/DescriptionListTerm'
import DescriptionListDetails from 'themes/dindim/foundations/DescriptionListDetails/DescriptionListDetails'
import InputRadio from 'themes/dindim/foundations/InputRadio/InputRadio'
import PreOrderSystemSummary from 'themes/dindim/elements/PreOrderSystemSummary/PreOrderSystemSummary'

import { Outer, Row } from './CheckoutTemplate.styles'
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
    country: '',
    deliveryMethod: undefined,
  }

  const useFormMethods = useForm({ defaultValues })
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { getValues } = useFormMethods
  const { deliveryMethod } = getValues()
  const deliveryPrice = deliveryMethod === DeliveryMethod.DELIVERY ? 9 : 0
  const { onSubmit } = useOnSubmit({ deliveryPrice })

  if (process.env.NEXT_PUBLIC_ENABLE_CHECKOUT !== 'true') {
    return null
  }

  if (basket.status !== 'ready') {
    return <Outer center>{t('basket.loading')}</Outer>
  }

  if (!basket.cart?.length) {
    return (
      <PageLayout title={t('Checkout')}>
        <PageRow>
          <PageColumn style={{ margin: '0 auto' }} width="50%">
            <PageSection style={{ textAlign: 'center' }}>{t('basket.empty', { context: 'inCheckout' })}</PageSection>
          </PageColumn>
        </PageRow>
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title={t('Checkout')}
      description={t('Review your products, provide your details and place your order.')}
      simple
    >
      <PageRow>
        <PageColumn md="6">
          <PreOrderSystemSummary />

          <PageSection>
            <PageSectionHeader>{t('Your bag')}</PageSectionHeader>
            <OrderItems cart={basket.cart} />
            {/* <Payment /> */}
          </PageSection>
        </PageColumn>

        <PageColumn md="6">
          <Form useFormMethods={useFormMethods} onSubmit={onSubmit}>
            <PageSection>
              <PageSectionHeader>{t('Total')}</PageSectionHeader>
              <DescriptionList>
                <DescriptionListTerm>{t('Subtotal (VAT included)')}</DescriptionListTerm>
                <DescriptionListDetails>{t('common.price', { value: basket.total.gross })}</DescriptionListDetails>

                <DescriptionListTerm>{t('Delivery')}</DescriptionListTerm>
                <DescriptionListDetails>
                  {deliveryPrice === 0 ? t('Free') : t('common.price', { value: deliveryPrice })}
                </DescriptionListDetails>

                <DescriptionListTerm>{t('Total')}</DescriptionListTerm>
                <DescriptionListDetails>
                  {t('common.price', { value: basket.total.gross + deliveryPrice })}
                </DescriptionListDetails>
              </DescriptionList>
            </PageSection>

            <PageSection>
              <PageSectionHeader>{t('Delivery')}</PageSectionHeader>
              <p>
                {t(
                  'We are a small shop! If you know us and we have discussed how to give you the products, choose pickup to save delivery costs!',
                )}
              </p>

              <InputRadio
                name="deliveryMethod"
                label={t('')}
                options={[
                  { label: t('Pickup'), value: DeliveryMethod.PICKUP },
                  { label: t('Delivery'), value: DeliveryMethod.DELIVERY },
                ]}
              />
            </PageSection>

            {deliveryMethod ? (
              <PageSection>
                <PageSectionHeader>{t('Contact Details')}</PageSectionHeader>

                <PageRow>
                  <PageColumn>
                    <InputText type="email" name="email" label={t('Email')} required />
                  </PageColumn>
                </PageRow>
                <PageRow>
                  <PageColumn md="6">
                    <InputText name="firstName" label={t('First name')} required />
                  </PageColumn>
                  <PageColumn md="6">
                    <InputText name="lastName" label={t('Last name')} required />
                  </PageColumn>
                </PageRow>
                {deliveryMethod === DeliveryMethod.DELIVERY ? (
                  <>
                    <PageRow>
                      <InputText name="street" label={t('Street')} required />
                    </PageRow>
                    <PageRow>
                      <PageColumn md="6">
                        <InputText name="postalCode" label={t('Postal Code')} required />
                      </PageColumn>
                      <PageColumn md="6">
                        <InputText name="city" label={t('City')} required />
                      </PageColumn>
                    </PageRow>
                    <PageRow>
                      <PageColumn>
                        <InputText name="country" label={t('Country')} required />
                      </PageColumn>
                    </PageRow>
                  </>
                ) : null}
                <Button type="submit" variant="primary">
                  {t('Place Order')}
                </Button>
              </PageSection>
            ) : null}
          </Form>
        </PageColumn>
      </PageRow>
    </PageLayout>
  )
}

enum DeliveryMethod {
  PICKUP = 'PICKUP',
  DELIVERY = 'DELIVERY',
}
