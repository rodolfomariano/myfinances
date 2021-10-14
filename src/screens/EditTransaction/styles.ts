import styled from "styled-components/native"
import { RFValue } from "react-native-responsive-fontsize"
import { AntDesign } from '@expo/vector-icons'

import { RectButton, GestureHandlerRootView } from "react-native-gesture-handler"

export const Container = styled(GestureHandlerRootView)`
  width: 100%;
  min-height: ${RFValue(650)}px;
  
  background-color: ${({ theme }) => theme.colors.background};

`
export const HeaderContainer = styled.View`
  position: relative;
  background-color: ${({ theme }) => theme.colors.shape_dark};
  padding: 16px 24px;
 
`

export const TransactionDate = styled.Text`
  font-family: ${({ theme }) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.text};
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title_regular};
  font-size: ${RFValue(16)}px;
  margin-top: 8px;
`

export const FormContainer = styled.View`
  flex: 1;
  padding: 32px 24px;
`
export const TransactionTypesContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 8px;
  margin-bottom: 16px;
`

export const Footer = styled.View`
  margin-top: ${RFValue(40)}px;
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`