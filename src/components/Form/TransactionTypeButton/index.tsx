import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import {
  Container,
  Icon,
  Title
} from './styles'

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  title: string
  type: 'input' | 'output'
  isActive: boolean
}

export function TransactionTypeButton({ title, type, isActive, ...rest }: TransactionTypeButtonProps) {

  return (
    <Container type={type} isActive={isActive} {...rest}>
      <Icon
        type={type}
        name={type === 'input'
          ? 'arrow-up-circle'
          : 'arrow-down-circle'
        }
      />
      <Title>{title}</Title>
    </Container>
  )
}