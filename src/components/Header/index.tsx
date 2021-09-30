import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import {
  Container,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  PowerOffButton
} from './styles'

export function Header() {
  const theme = useTheme()

  return (
    <Container>
      <UserInfo>
        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/62636838?v=4' }} />
        <User>
          <UserGreeting>Olá,</UserGreeting>
          <UserName>Rodolfo</UserName>
        </User>
      </UserInfo>

      <PowerOffButton>
        <AntDesign
          name='poweroff'
          size={20}
          color={theme.colors.error}
        />

      </PowerOffButton>

    </Container>
  )
}