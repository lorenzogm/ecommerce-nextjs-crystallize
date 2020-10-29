import mjml2html from '@nerdenough/mjml-ncc-bundle'
import nodemailer from 'nodemailer'

import { callOrdersApi } from 'lib-api/crystallize'
import QUERY_ORDER_BY_ID from 'lib-api/crystallize/graph/queries/order-by-id'
import { formatCurrency } from 'lib/currency'

import { sendEmail } from './utils'

async function main({ to, html }) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  })
  // let transporter = nodemailer.createTransport({
  //   host: 'smtp.ionos.es',
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: process.env.EMAIL_USER, // generated ethereal user
  //     pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  //   },
  // })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Dindim" <dindim.ethicalbrand@gmail.com>', // sender address
    to, // list of receivers
    subject: 'Gracias por tu pedido! | Dindim', // Subject line
    text: html.replace(/<[^>]*>/g, ''), // plain text body
    html, // html body
  })
}

export default async function sendOrderConfirmation(orderId: string) {
  try {
    const response = await callOrdersApi({
      query: QUERY_ORDER_BY_ID,
      variables: {
        id: orderId,
      },
      operationName: 'getOrder',
    })
    const order = response.data.orders.get
    const { email } = order.customer.addresses[0]

    if (!email) {
      // Ideally an email address will always be provided, but if not...
      return
    }

    const { html } = mjml2html(`
      <mjml>
        <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>
              <h1>Order Summary</h1>
              <p>Thanks for your order! This email contains a copy of your order for your reference.</p>
              <p>
                Order Number: <strong>#${order.id}</strong>
              </p>
              <p>
                First name: <strong>${order.customer.firstName}</strong><br />
                Last name: <strong>${order.customer.lastName}</strong><br />
                Email address: <strong>${email}</strong>
              </p>
              <p>
                Total: <strong>${formatCurrency({
                  amount: order.total.gross,
                  currency: order.total.currency,
                })}</strong>
              </p>
            </mj-text>
            <mj-table>
              <tr style="border-bottom:1px solid #ecedee;text-align:left;">
                <th style="padding: 0 15px 0 0;">Name</th>
                <th style="padding: 0 15px;">Quantity</th>
                <th style="padding: 0 0 0 15px;">Total</th>
              </tr>
              ${order.cart.map(
                (item) => `<tr>
                  <td style="padding: 0 15px 0 0;">${item.name} (${item.sku})</td>
                  <td style="padding: 0 15px;">${item.quantity}</td>
                  <td style="padding: 0 0 0 15px;">${formatCurrency({
                    amount: item.price.gross * item.quantity,
                    currency: item.price.currency,
                  })}</td>
                </tr>`,
              )}
            </mj-table>
          </mj-column>
        </mj-section>
        </mj-body>
      </mjml>
    `)

    // await sendEmail({
    //   to: 'test-m39bz3978@srv1.mail-tester.com',
    //   from: process.env.SENDGRID_EMAIL_FROM,
    //   subject: 'Gracias por tu pedido! | Dindim',
    //   html,
    // })

    await main({ to: email, html })
  } catch (error) {
    console.log({ error })
    Promise.resolve(error.stack)
  }
}
