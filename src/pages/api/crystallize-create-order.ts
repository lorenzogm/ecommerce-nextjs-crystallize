import { createCrystallizeOrder } from 'lib-api/crystallize/order'
import { emailOrderConfirmation } from 'lib-api/emails'

export default async (req, res) => {
  try {
    const { order } = req.body
    const createCrystallizeOrderResponse = await createCrystallizeOrder(order)

    await emailOrderConfirmation(createCrystallizeOrderResponse.data.orders.create.id)

    return res.status(200).send({
      success: true,
      ...createCrystallizeOrderResponse,
    })
  } catch (error) {
    return res.status(503).send({
      success: false,
      error: error.stack,
    })
  }
}
