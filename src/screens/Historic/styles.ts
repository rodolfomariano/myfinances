import styled from "styled-components/native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

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

export const HistoryCardContainer = styled.ScrollView`
  flex: 1;

  padding: 24px;
`