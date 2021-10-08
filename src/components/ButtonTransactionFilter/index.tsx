import React from 'react'
import { RectButtonProps } from "react-native-gesture-handler"

import {
  Container,
  Title
} from './styles'

interface ButtonTransactionFilterProps extends RectButtonProps {
  title: string
  type: string
  toActive: string
}

export function ButtonTransactionFilter({ title, type, toActive, ...rest }: ButtonTransactionFilterProps) {

  return (
    <Container
      isActive={type === toActive}
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  )
}