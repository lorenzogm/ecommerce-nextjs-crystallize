import appConfig, { isMultilingual } from 'lib/app-config'
import dynamic from 'next/dynamic'

const CheckoutSuccessTemplate = dynamic(
  () =>
    import(
      `themes/${process.env.NEXT_PUBLIC_THEME || 'dindim'}/templates/CheckoutSuccessTemplate/CheckoutSuccessTemplate`
    ),
)

export default CheckoutSuccessTemplate

export function getStaticProps() {
  return { props: {} }
}

export const getStaticPaths = !isMultilingual
  ? undefined
  : () => {
      return {
        paths: appConfig.locales.map((l) => `/${l.urlPrefix}/checkout/success`),
        fallback: false,
      }
    }
