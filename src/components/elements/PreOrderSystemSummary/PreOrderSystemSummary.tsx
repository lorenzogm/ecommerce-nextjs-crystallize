import styled from 'styled-components'

import { useT } from 'lib/i18n'
import PageSection from 'components/foundations/PageSection/PageSection'
import PageSectionHeader from 'components/foundations/PageSectionHeader/PageSectionHeader'

export const ListOrderer = styled.ol`
  margin: 0 0 12px 16px;
`

export default function PreOrderSystemSummary() {
  const t = useT()
  return (
    <PageSection>
      <PageSectionHeader>{t('Pre-order System')}</PageSectionHeader>
      <ListOrderer>
        <li>{t('Place your order and you will get a confirmation email with more details.')}</li>
        <li>{t('Make your payment via wire transfer.')}</li>
        <li>{t('When we receive your payment and the campaing is over, we start creating your product.')}</li>
        <li>{t('You will receive the product in 15-30 working days.')}</li>
      </ListOrderer>
    </PageSection>
  )
}
