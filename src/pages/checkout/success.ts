import dynamic from 'next/dynamic'

const CheckoutSuccessTemplate = dynamic(
  () => import(`themes/dindim/templates/CheckoutSuccessTemplate/CheckoutSuccessTemplate`),
)

export default CheckoutSuccessTemplate
