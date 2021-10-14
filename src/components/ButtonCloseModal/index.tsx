import React from 'react'
import { useTheme } from 'styled-components'

import { AntDesign } from '@expo/vector-icons'
import { RectButtonProps } from "react-native-gesture-handler"

import {
  Container
} from './styles'

interface ButtonCloseModalProps extends RectButtonProps {
  onPress: () => void
}

export function ButtonCloseModal({ onPress, ...rest }: ButtonCloseModalProps) {
  const theme = useTheme()

  return (
    <Container
      onPress={onPress}
      {...rest}
    >
      <AntDesign name='close' size={32} color={theme.colors.error_light} />
    </Container>
  )
}