import InstagramIcon from '@material-ui/icons/Instagram'

const instagram_link = process.env.NEXT_PUBLIC_INSTAGRAM

const Instagram = () => {
  return instagram_link ? (
    <a
      href={instagram_link}
      // eslint-disable-next-line react/jsx-no-target-blank
      target="_blank"
    >
      <InstagramIcon className="social-icon" />
    </a>
  ) : (
    <></>
  )
}

export default Instagram
