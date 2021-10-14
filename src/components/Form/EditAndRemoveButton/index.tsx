import React from 'react'
import { useTheme } from 'styled-components'
import { RectButtonProps } from "react-native-gesture-handler"

import { Feather } from '@expo/vector-icons'

import {
  Container,
  Title
} from './styles'

interface EditAndRemoveButton extends RectButtonProps {
  title: string
  type: 'edit' | 'remove'
  onPress: () => void
} 

export function EditAndRemoveButton({ title, type, ...rest }: EditAndRemoveButton) {
  const theme = useTheme()

  return (
    <Container type={type} {...rest}>
      <Feather name={type === 'edit' ? 'edit-2' : 'trash'} size={20} color={theme.colors.text} />
      <Title>
        {title}
      </Title>
    </Container>
  )
}