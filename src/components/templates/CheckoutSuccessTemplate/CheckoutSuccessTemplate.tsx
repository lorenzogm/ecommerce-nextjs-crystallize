import React from 'react'

import PageLayout from 'components/foundations/PageLayout/PageLayout'
import PageSection from 'components/foundations/PageSection/PageSection'
import PageRow from 'components/foundations/PageRow/PageRow'
import PageColumn from 'components/foundations/PageColumn/PageColumn'
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
      <PageRow>
        <PageColumn style={{ margin: '0 auto' }} width="50%">
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
        </PageColumn>
      </PageRow>
    </PageLayout>
  )
}
