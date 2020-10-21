import FacebookIcon from '@material-ui/icons/Facebook'

const facebook_link = process.env.NEXT_PUBLIC_FACEBOOK

const SocialFacebook = () => {
  return facebook_link ? (
    <a
      href={facebook_link}
      // eslint-disable-next-line react/jsx-no-target-blank
      target="_blank"
    >
      <FacebookIcon className="social-icon" />
    </a>
  ) : (
    <></>
  )
}

export default SocialFacebook
