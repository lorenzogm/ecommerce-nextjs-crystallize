import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

import appConfig from 'app.config.json'

type CheckoutSuccessPageProps = {
  theme: string
}

export default function CheckoutSuccessPage({ theme }: CheckoutSuccessPageProps) {
  const CheckoutSuccessTemplate = dynamic(
    () => import(`themes/${theme}/templates/CheckoutSuccessTemplate/CheckoutSuccessTemplate`),
  )

  return <CheckoutSuccessTemplate />
}

export const getStaticProps: GetStaticProps = async () => {
  const theme = process.env.THEME || appConfig.theme.default

  return { props: { theme } }
}
