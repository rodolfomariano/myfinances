import React from 'react'
import { TextInputProps } from 'react-native'
import { Control, Controller } from 'react-hook-form'

import { Input } from '../Input'

import {
  Container
} from './styles'

interface InputWithHookFormProps extends TextInputProps {
  control: Control
  name: string
}

export function InputWithHookForm({ name, control, ...rest }: InputWithHookFormProps) {
  return (
    <Container>
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