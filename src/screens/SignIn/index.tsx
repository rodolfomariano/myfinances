import React from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import LogoSVG from '../../assets/logo.svg'
import { SocialLogInButton } from '../../components/SocialLogInButton'

import {
  Container,
  HeaderContainer,
  TitleWrapper,
  Title,
  SubTitle,
  SignInTitle,
  Footer,
  SignButtonContainer
} from './styles'

export function SignIn() {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <HeaderContainer>
        <TitleWrapper>
          <LogoSVG width={RFValue(170)} height={RFValue(170)} />

          <Title>
            Controle finaceiro {`\n`}
            pessoal
          </Title>
          <SubTitle>
            Simples e prático
          </SubTitle>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login!
        </SignInTitle>

      </HeaderContainer>
      <Footer>
        <SignButtonContainer>
          <SocialLogInButton
            title='Entrar com Google'
            iconName='google'
          />

          <SocialLogInButton
            title='Entrar com Apple'
            iconName='apple1'
          />
        </SignButtonContainer>
      </Footer>
    </Container>
  )
}