import mjml2html from '@nerdenough/mjml-ncc-bundle'
import nodemailer from 'nodemailer'

import { formatCurrency } from 'lib/currency'
import { DeliveryMethod } from 'types/deliveryTypes'
import { DELIVERY_PRICE, SITE_NAME } from 'config/constants'

async function main({ to, html, customer }) {
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
  await transporter.sendMail({
    from: `"${SITE_NAME}" <${process.env.EMAIL_USER}>`, // sender address
    to, // list of receivers
    subject: `Gracias por tu pedido! | ${SITE_NAME}`, // Subject line
    text: html.replace(/<[^>]*>/g, ''), // plain text body
    html, // html body
  })

  await transporter.sendMail({
    from: `"${SITE_NAME}" <${process.env.EMAIL_USER}>`, // sender address
    to: process.env.EMAIL_USER, // list of receivers
    subject: `Nuevo pedido de ${customer.firstName} ${customer.lastName} | ${SITE_NAME}`, // Subject line
    text: html.replace(/<[^>]*>/g, ''), // plain text body
    html, // html body
  })
}

export default async function sendOrderConfirmation({ orderId, order, deliveryMethod }) {
  try {
    // const response = await callOrdersApi({
    //   query: QUERY_ORDER_BY_ID,
    //   variables: {
    //     id: orderId,
    //   },
    //   operationName: 'getOrder',
    // })
    const { email } = order.customer.addresses[0]

    if (!email) {
      // Ideally an email address will always be provided, but if not...
      return
    }

    const deliveryPrice = deliveryMethod === DeliveryMethod.PICKUP ? 0 : DELIVERY_PRICE

    const { html } = mjml2html(`
      <mjml>
        <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>
              <h1>¡Gracias por tu pedido!</h1>
              <p>Este email es la confirmación del pedido que has realizado en Dindim.</p>
              <p>Para finalizar el proceso, por favor realizar un pago por transferencia bancaría a la siguiente cuenta:</p>
              <p>IBAN: ${process.env.IBAN}</p>
              <p>
                Total: <strong>${formatCurrency({
                  amount: order.total.gross + deliveryPrice,
                  currency: order.total.currency,
                })}</strong>
              </p>
              <p>
                Pedido número: <strong>#${orderId}</strong>
              </p>
              <p>
                Nombre: <strong>${order.customer.firstName}</strong><br />
                Apellidos: <strong>${order.customer.lastName}</strong><br />
                Email: <strong>${email}</strong>
              </p>
            </mj-text>
            <mj-table>
              <tr style="border-bottom:1px solid #ecedee;text-align:left;">
                <th style="padding-right: 4px;">Artículo</th>
                <th style="padding-right: 4px;"></th>
                <th style="padding-right: 4px;">Cantidad</th>
                <th style="min-width: 60px;">Total</th>
              </tr>
              ${order.cart.map(
                (item) => `<tr>
                  <td style="padding-right: 4px;">
                    <img src="${item.imageUrl}" alt="${item.name}" width="50px" />
                  </td>
                  <td style="padding-right: 4px;">
                    <p>${item.name}</p>
                  </td>
                  <td style="padding-right: 4px;">${item.quantity}</td>
                  <td style="min-width: 60px;">${formatCurrency({
                    amount: item.price.gross * item.quantity,
                    currency: order.total.currency,
                  })}</td>
                </tr>`,
              )}
              <tr>
                <td></td>
                <td></td>
                <td style="padding-right: 4px;">Subtotal</td>
                <td style="min-width: 60px;">${formatCurrency({
                  amount: order.total.gross,
                  currency: order.total.currency,
                })}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td style="padding-right: 4px;">Gastos de envío</td>
                <td style="min-width: 60px;">${formatCurrency({
                  amount: deliveryPrice,
                  currency: order.total.currency,
                })}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td style="padding-right: 4px;">Total</td>
                <td style="min-width: 60px;">${formatCurrency({
                  amount: order.total.gross + deliveryPrice,
                  currency: order.total.currency,
                })}</td>
              </tr>
            </mj-table>
          </mj-column>
        </mj-section>
        </mj-body>
      </mjml>
    `)

    // await sendEmail({
    //   to: 'test-3s3ai2rfp@srv1.mail-tester.com',
    //   from: process.env.SENDGRID_EMAIL_FROM,
    //   subject: '¡Gracias por tu pedido! | Dindim',
    //   text: html.replace(/<[^>]*>/g, ''), // plain text body
    //   html,
    // })

    // await sendEmail({
    //   to: 'info@dindim.es',
    //   from: process.env.SENDGRID_EMAIL_FROM,
    //   subject: `Nuevo pedido de ${order.customer.firstName} ${order.customer.lastName} | Dindim`, // Subject line
    //   text: html.replace(/<[^>]*>/g, ''), // plain text body
    //   html,
    // })

    await main({ to: email, html, customer: order.customer })
  } catch (error) {
    console.error({ error })
    Promise.resolve(error.stack)
  }
}
