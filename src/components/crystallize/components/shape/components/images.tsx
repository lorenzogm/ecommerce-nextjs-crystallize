import styled from 'styled-components'
import Image from 'components/foundations/Image/Image'

import { responsive } from 'components/crystallize/ui'

const Outer = styled.div`
  margin: 0 0 2em;
`

const List = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 100px;

  > picture {
    min-height: 300px;
    ${responsive.xs} {
      min-height: 100px;
    }
    &:nth-child(3n) {
      grid-column-start: span 2;
    }
  }

  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

export default function Images({ images }) {
  if (!images || images.length === 0) {
    return null
  }

  if (images.length === 1) {
    return (
      <Outer>
        <Image src={images[0].url} alt={images[0].altText} width={300} height={300} />
      </Outer>
    )
  }

  return (
    <Outer>
      <List>
        {images.map((image, index) => (
          <Image key={index} src={image.url} alt={image.altText} width={300} height={300} />
        ))}
      </List>
    </Outer>
  )
}
