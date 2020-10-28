import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

import appConfig from 'app.config.json'

type CheckoutPageProps = {
  theme: string
}

export default function CheckoutPage({ theme }: CheckoutPageProps) {
  const CheckoutTemplate = dynamic(() => import(`themes/${theme}/templates/CheckoutTemplate/CheckoutTemplate`))

  return <CheckoutTemplate />
}

export const getStaticProps: GetStaticProps = async () => {
  const theme = process.env.THEME || appConfig.theme.default

  return { props: { theme } }
}
