import styled from 'styled-components'

export const ButtonDefault = styled.button`
  color: var(--color-text-sub);
  font-weight: bold;
  appearance: none;
  background: white;
  border: none;
  padding: 8px 20px;
  margin: 0;
  cursor: pointer;
  text-transform: capitalize;
  position: relative;
  border-radius: 4px;
  &:focus,
  &:active {
    outline: none;
  }
`

export const ButtonPrimary = styled(ButtonDefault)`
  background: #000;
  color: white;
  border: 1px solid #000;
`
