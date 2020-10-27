import dynamic from 'next/dynamic'

const CheckoutTemplate = dynamic(
  () => import(`themes/${process.env.NEXT_PUBLIC_THEME || 'crystallize'}/templates/CheckoutTemplate/CheckoutTemplate`),
)

export default CheckoutTemplate
