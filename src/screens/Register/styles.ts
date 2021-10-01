import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const HeaderContainer = styled.View`
  width: 100%;
  /* height: ${RFPercentage(42)}px; */
  
  background-color: ${({ theme }) => theme.colors.shape_dark};
  padding: 0 24px 16px;
`

export const HeaderTitle = styled.Text`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title_bold};
  margin-top: 32px;
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
  margin-top: 24px;
  width: 100%;
`