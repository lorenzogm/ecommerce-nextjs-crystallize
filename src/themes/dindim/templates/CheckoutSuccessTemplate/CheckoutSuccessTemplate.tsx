import React from 'react'

import PageLayout from 'themes/dindim/foundations/PageLayout/PageLayout'
import PageSection from 'themes/dindim/foundations/PageSection/PageSection'
import PageRow from 'themes/dindim/foundations/PageRow/PageRow'
import PageColumn from 'themes/dindim/foundations/PageColumn/PageColumn'
import { useT } from 'lib/i18n'
import PreOrderSystemSummary from 'themes/dindim/elements/PreOrderSystemSummary/PreOrderSystemSummary'
import Link from 'themes/crystallize/components/link'

export default function CheckoutSuccessTemplate() {
  const t = useT()

  return (
    <PageLayout
      title={t('Checkout')}
      description={t('Review your products, provide your details and place your order.')}
      simple
    >
      <PageRow>
        <PageColumn style={{ margin: '0 auto' }} width="50%">
          <PageSection style={{ textAlign: 'center' }}>
            <h1>{t('Thank you for your order!')}</h1>
            <p>{t("We've received your order and we are going to send you an email with further information.")}</p>

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
        </PageColumn>
      </PageRow>
    </PageLayout>
  )
}
