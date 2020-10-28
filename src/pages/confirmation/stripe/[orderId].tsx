import dynamic from 'next/dynamic'

import appConfig from 'app.config.json'
import { fetchCrystallizeOrder } from 'lib-api/crystallize/order'

export default function ConfirmationPage({ theme, order }) {
  const Confirmation = dynamic(() => import(`themes/${theme}/templates/CheckoutTemplate/Confirmation`))

  return <Confirmation order={order} />
}

export async function getServerSideProps({ query }) {
  const order = await fetchCrystallizeOrder(query.orderId)

  const theme = process.env.THEME || appConfig.theme.default

  return {
    props: {
      theme
      order,
    },
  }
}
