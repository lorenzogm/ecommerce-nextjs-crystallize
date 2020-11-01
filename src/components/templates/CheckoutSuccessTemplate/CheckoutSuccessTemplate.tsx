import React from 'react'

import PageLayout from 'components/foundations/PageLayout/PageLayout'
import PageSection from 'components/foundations/PageSection/PageSection'
import { useT } from 'lib/i18n'
import PreOrderSystemSummary from 'components/elements/PreOrderSystemSummary/PreOrderSystemSummary'
import Link from 'components/crystallize/components/link'

export default function CheckoutSuccessTemplate() {
  const t = useT()

  return (
    <PageLayout
      title={t('Checkout')}
      description={t('Review your products, provide your details and place your order.')}
      simple
    >
      <div className="flex flex-row">
        <div className="mx-auto w-full md:w-3/4">
          <PageSection style={{ textAlign: 'center' }}>
            <h1>{t('Thank you for your order!')}</h1>
            <p>{t("We've received your order. You'll receive an email with further information. Check your inbox!")}</p>

            <p>
              {t('You can close this page or you can')}
              <span>
                <Link href="/">
                  <a>{t(' keep shopping!')}</a>
                </Link>
              </span>
            </p>
          </PageSection>

          <PreOrderSystemSummary />
        </div>
      </div>
    </PageLayout>
  )
}
