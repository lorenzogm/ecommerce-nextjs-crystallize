import { createCrystallizeOrder } from 'lib-api/crystallize/order'
import { emailOrderConfirmation } from 'lib-api/emails'

export default async (req, res) => {
  try {
    const { order, deliveryMethod } = req.body
    // const createCrystallizeOrderResponse = await createCrystallizeOrder(order)

    await emailOrderConfirmation({ orderId: '5f9c143bb7a3b4001c8a68ad', order, deliveryMethod })
    // await emailOrderConfirmation({ orderId: createCrystallizeOrderResponse.data.orders.create.id, order })

    return res.status(200).send({
      success: true,
      // ...createCrystallizeOrderResponse,
    })
  } catch (error) {
    return res.status(503).send({
      success: false,
      error: error.stack,
    })
  }
}
