import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import styled from "styled-components/native"
import theme from "../../global/styles/theme"


export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`
export const HeaderContainer = styled.View`
  width: 100%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.shape_dark};
`

export const TitleWrapper = styled.View`
  width: 100%;
  padding-top: 64px;

  align-items: center;
`

export const Title = styled.Text`
  text-align: center;
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 40px;
  
  color: ${({ theme }) => theme.colors.title_regular};
`

export const SubTitle = styled.Text`
  text-align: center;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.title_regular};
  margin-top: 16px;
`

export const SignInTitle = styled.Text`
  text-align: center;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.title_regular};
  margin-top: 90px;
`

export const Footer = styled.View`
  width: 100%;
  height: 30%;
  `
export const SignButtonContainer = styled.View`
  padding: 0 24px;
  margin-top: -35px;

`