import React, { useState } from 'react'
import { ActivityIndicator, Alert, StatusBar, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

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
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithGoogle, signWithApple } = useAuth()

  const theme = useTheme()

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true)
      return await signInWithGoogle()

    } catch (error) {
      console.log(error)
      Alert.alert('Erro na autenticação', 'Não foi possível conectar a conta Google!')
      setIsLoading(false)
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true)
      return await signWithApple()

    } catch (error) {
      console.log(error)
      Alert.alert('Erro na autenticação', 'Não foi possível conectar a conta Apple!')
      setIsLoading(false)
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
          {Platform.OS === 'ios' &&
            <SocialLogInButton
              title='Entrar com Apple'
              iconName='apple1'
              onPress={handleSignInWithApple}
            />

          }
        </SignButtonContainer>

        {isLoading && <ActivityIndicator
          color={theme.colors.attention}
          size={32}
          style={{
            marginTop: 16
          }}
        />}
      </Footer>

    </Container>
  )
}