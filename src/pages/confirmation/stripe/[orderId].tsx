import Confirmation from 'components/templates/CheckoutTemplate/Confirmation'
import { fetchCrystallizeOrder } from 'lib-api/crystallize/order'

export default function ConfirmationPage({ order }) {
  return <Confirmation order={order} />
}

export async function getServerSideProps({ query }) {
  const order = await fetchCrystallizeOrder(query.orderId)

  return {
    props: {
      order,
    },
  }
}
