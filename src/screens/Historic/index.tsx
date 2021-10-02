import React from 'react'
import { StatusBar } from 'react-native'
import { Header } from '../../components/Header'

import {
  Container,
  HeaderContainer,
  HeaderTitle
} from './styles'

export function Historic() {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <HeaderContainer>
        <Header />

        <HeaderTitle>Histórico de Transações</HeaderTitle>
      </HeaderContainer>
    </Container>
  )
}