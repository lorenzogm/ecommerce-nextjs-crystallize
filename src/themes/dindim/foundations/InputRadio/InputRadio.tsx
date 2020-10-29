import React, { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import Label from 'themes/dindim/foundations/Label/Label'
import Button from 'themes/dindim/foundations/Button/Button'

const Wrapper = styled.div`
  margin-bottom: 8px;
`
const Input = styled.input`
  width: 0;
  height: 0;
  position: absolute;
  left: -9999px;
`

type InputRadioProps = {
  name: string
  label: string
  options: InputRadioOptions[]
  required?: boolean
  onChange: (e: string) => void
}

type InputRadioOptions = {
  label: string
  value: string
}

export default function InputRadio({ name, label, options, required = false, onChange, ...rest }: InputRadioProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, setValue, getValues, watch } = useFormContext()

  return (
    <Wrapper>
      <Label>{label}</Label>

      {options.map((option) => {
        return (
          <React.Fragment key={option.label}>
            <Input
              type="radio"
              name={name}
              value={option.value}
              ref={register({ required })}
              id={`${name}-id-${option.value}`}
            />
            <Label htmlFor={`${name}-id-${option.value}`} isLabelVisuallyHidden>
              {option.label}
            </Label>
            <Button
              variant={watch(name) === option.value ? 'primary' : undefined}
              onClick={() => {
                setValue(name, option.value)
                onChange(option.value)
              }}
            >
              {option.value}
            </Button>
          </React.Fragment>
        )
      })}
    </Wrapper>
  )
}
