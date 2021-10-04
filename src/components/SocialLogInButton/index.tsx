import React from 'react'
import { useTheme } from 'styled-components'
import { AntDesign } from '@expo/vector-icons'
import { RectButtonProps } from 'react-native-gesture-handler'

import {
  Container,
  LogoContainer,
  TitleContainer,
  Title,
} from './styles'

interface SocialLogInButtonProps extends RectButtonProps {
  title: string
  iconName: 'google' | 'apple1'
}

export function SocialLogInButton({ title, iconName, ...rest }: SocialLogInButtonProps) {
  const theme = useTheme()

  return (
    <Container {...rest}>
      <LogoContainer>
        <AntDesign
          name={iconName}
          size={32}
          color={theme.colors.text}
        />
      </LogoContainer>

      <TitleContainer>
        <Title>
          {title}
        </Title>
      </TitleContainer>
    </Container>
  )
}