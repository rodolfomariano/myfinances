import React from 'react'
import { Alert, StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import LogoSVG from '../../assets/logo.svg'
import { SocialLogInButton } from '../../components/SocialLogInButton'
import { useAuth } from '../../hooks/auth'

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
  const { signInWithGoogle } = useAuth()

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle()

    } catch (error) {
      console.log(error)
      Alert.alert('Erro na autenticação', 'Não foi possível conectar a conta Google!')
    }
  }

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
            onPress={handleSignInWithGoogle}
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