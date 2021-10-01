import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import {
  Container,
  Category,
  Icon
} from './styles'

interface CategorySelect extends TouchableOpacityProps {
  title: string
}

export function CategorySelect({ title, ...rest }: CategorySelect) {
  return (
    <Container {...rest}>
      <Category>{title}</Category>
      <Icon name='chevron-down' />
    </Container>
  )
}