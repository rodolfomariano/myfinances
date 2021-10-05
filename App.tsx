import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react';
import { ThemeProvider } from 'styled-components'
import AppLoading from 'expo-app-loading'

import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'

import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  })

  const { userStorageLoading } = useAuth()

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>

      <AuthProvider>
        <Routes />
      </AuthProvider>

    </ThemeProvider>
  );
}
