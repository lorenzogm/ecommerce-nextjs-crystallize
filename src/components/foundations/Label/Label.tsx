import styled from 'styled-components'

const LabelStyled = styled.label`
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 600;
`
const VisuallyHidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

type LabelProps = {
  htmlFor?: string
  children?: string
  // https://www.w3.org/WAI/tutorials/forms/labels/#note-on-hiding-elements
  isLabelVisuallyHidden?: boolean
}

export default function Label({ children, htmlFor, isLabelVisuallyHidden }: LabelProps) {
  const Component = isLabelVisuallyHidden ? VisuallyHidden : 'span'
  return (
    <LabelStyled htmlFor={htmlFor}>
      <Component>{children}</Component>
    </LabelStyled>
  )
}
