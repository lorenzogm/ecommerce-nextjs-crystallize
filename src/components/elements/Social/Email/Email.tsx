import MailOutlineIcon from '@material-ui/icons/MailOutline'

const email_link = `mailto:${process.env.NEXT_PUBLIC_EMAIL}`

const Email = () => {
  return email_link ? (
    <a
      href={email_link}
      // eslint-disable-next-line react/jsx-no-target-blank
      target="_blank"
      data-label="E-mail"
    >
      <MailOutlineIcon className="social-icon" />
    </a>
  ) : (
    <></>
  )
}

export default Email
