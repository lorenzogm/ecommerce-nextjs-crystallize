import ImageNext from 'next/image'
import styled from 'styled-components'

type ImageProps = {
  src: string
  alt: string
  width: number
  height: number
}

export default function Image({ src, alt, width, height }: ImageProps) {
  return <ImageStyled src={src} alt={alt} width={width} height={height} />
}

const ImageStyled = styled(ImageNext)`
  object-fit: contain;
`
