import styled from 'styled-components'

export const ButtonDefault = styled.button`
  appearance: none;
  background: white;
  border: 2px solid var(--color-text-main);
  color: var(--color-text-main);
  cursor: pointer;
  display: block;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  padding: 16px 25px;
  position: relative;
  text-align: center;
  text-transform: uppercase;

  &:focus,
  &:active {
    outline: none;
  }

  &[disabled] {
    cursor: default;
    opacity: 0.5;
    text-decoration: none;
  }

  &:not([disabled]):hover {
    background: var(--color-text-main);
    color: var(--color-main-background);
    text-decoration: none;
  }
`

export const ButtonPrimary = styled(ButtonDefault)`
  background: #000;
  color: white;
  border: 1px solid #000;
`
