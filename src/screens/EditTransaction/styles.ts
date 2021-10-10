import { RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"
import { AntDesign } from '@expo/vector-icons'

import { RectButton, GestureHandlerRootView } from "react-native-gesture-handler"

export const Container = styled(GestureHandlerRootView)`
  /* flex: 1 */
  width: 100%;
  min-height: ${RFValue(500)}px;
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
export const ExitButton = styled(RectButton)`
  position: absolute;
  right: 15px;
  top: 16px;
  padding: 8px; 
`

export const ExitIcon = styled(AntDesign)`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.error_light};
`

export const FormContainer = styled.ScrollView`
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
  margin-top: 24px;
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const LoadContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`