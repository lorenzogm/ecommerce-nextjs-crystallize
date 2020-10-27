import dynamic from 'next/dynamic'

import { fetchCrystallizeOrder } from 'lib-api/crystallize/order'

const Confirmation = dynamic(
  () =>
    import(
      `themes/${
        process.env.NEXT_PUBLIC_THEME || 'crystallize'
      }/templates/CheckoutTemplate/Confirmation`
    ),
)

export default Confirmation

export async function getServerSideProps({ query: { orderId } }) {
  const order = await fetchCrystallizeOrder(orderId)

  return {
    props: {
      order,
    },
  }
}
