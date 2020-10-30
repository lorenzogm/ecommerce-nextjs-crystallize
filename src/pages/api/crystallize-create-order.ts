import { createCrystallizeOrder } from 'lib-api/crystallize/order'
import { emailOrderConfirmation } from 'lib-api/emails'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { order, deliveryMethod } = req.body
    const createCrystallizeOrderResponse = await createCrystallizeOrder(order)

    await emailOrderConfirmation({
      orderId: createCrystallizeOrderResponse.data.orders.create.id,
      order,
      deliveryMethod,
    })

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
