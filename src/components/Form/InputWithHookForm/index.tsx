import React from 'react'
import { TextInputProps } from 'react-native'
import { Control, Controller } from 'react-hook-form'

import { Input } from '../Input'
import { FormData } from '../../../screens/Register'

import {
  Container,
  ErrorText
} from './styles'

interface InputWithHookFormProps extends TextInputProps {
  control: Control
  name: string
  errorMessage?: string
}

export function InputWithHookForm({ name, control, errorMessage, ...rest }: InputWithHookFormProps) {
  return (
    <Container>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
      />
    </Container>
  )
}