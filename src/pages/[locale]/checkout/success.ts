import appConfig from 'lib/app-config'
import { GetStaticPaths } from 'next'
import dynamic from 'next/dynamic'

const CheckoutSuccessTemplate = dynamic(
  () => import(`themes/dindim/templates/CheckoutSuccessTemplate/CheckoutSuccessTemplate`),
)

export default CheckoutSuccessTemplate

export function getStaticProps() {
  return { props: {} }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: appConfig.locales.map((l) => `/${l.urlPrefix}/checkout/success`),
    fallback: false,
  }
}
