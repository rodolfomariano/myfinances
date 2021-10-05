import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import { useAuth } from '../../hooks/auth'

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
  const { user, signOut } = useAuth()
  const theme = useTheme()

  return (
    <Container>
      <UserInfo>
        <Photo source={{ uri: user.photo }} />
        <User>
          <UserGreeting>Olá,</UserGreeting>
          <UserName>{user.name}</UserName>
        </User>
      </UserInfo>

      <PowerOffButton onPress={signOut}>
        <AntDesign
          name='poweroff'
          size={20}
          color={theme.colors.error}
        />

      </PowerOffButton>

    </Container>
  )
}