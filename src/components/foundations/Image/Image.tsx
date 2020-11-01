import ImageNext from 'next/image'
import styled from 'styled-components'

type ImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  unsized?: boolean
}

export default function Image({ src, alt, width, height, unsized }: ImageProps) {
  return <ImageStyled src={src} alt={alt} width={width} height={height} unsized={unsized} />
}

const ImageStyled = styled(ImageNext)`
  object-fit: contain;
`
