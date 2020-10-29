import sgMail from '@sendgrid/mail'

const { SENDGRID_API_KEY } = process.env
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY)
}

export async function sendEmail(args = {}) {
  if (SENDGRID_API_KEY) {
    sgMail.setApiKey(SENDGRID_API_KEY)
    await sgMail.send(args)
  } else {
    console.log('Sendgrid API key not defined. Email not sent to', args.to)
  }
}
