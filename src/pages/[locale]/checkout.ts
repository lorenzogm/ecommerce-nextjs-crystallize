import appConfig, { isMultilingual } from 'lib/app-config'
import dynamic from 'next/dynamic'

const CheckoutTemplate = dynamic(
  () =>
    import(
      `themes/${
        process.env.NEXT_PUBLIC_THEME || 'crystallize'
      }/templates/CheckoutTemplate/CheckoutTemplate`
    ),
)

export default CheckoutTemplate

export function getStaticProps() {
  return { props: {} }
}

export const getStaticPaths = () => {
  return {
    paths: appConfig.locales.map((l) => `/${l.urlPrefix}/checkout`),
    fallback: false,
  }
}
