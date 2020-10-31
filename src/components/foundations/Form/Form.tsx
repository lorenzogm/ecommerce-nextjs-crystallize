import React, { ReactElement } from 'react'
import { FormProvider, UseFormMethods } from 'react-hook-form'

type FormProps = {
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormMethods: UseFormMethods<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: Record<string, any>) => void
}

export default function Form({
  useFormMethods,
  children,
  onSubmit,
}: FormProps): ReactElement {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...useFormMethods}>
      <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
