import styled from "styled-components/native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import { BorderlessButton, RectButton } from "react-native-gesture-handler"
import { Feather } from '@expo/vector-icons'

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

  padding: 0 24px;
  margin-bottom: 4px;
`

export const Content = styled.ScrollView``

export const ChartContainer = styled.View`
  align-items: center;
  justify-content: center;
`

export const MonthSelect = styled.View`
  width: 100%;
  margin-top: 24px;
  padding: 0 24px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const MonthSelectButton = styled(BorderlessButton)`
  
`

export const SelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
`
export const SelectTypeOfTransactions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  /* width: 100%; */
  margin-top: 16px;
  margin-left: 24px;
  margin-right: 24px;
  /* padding: 8px 24px; */
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.text};
`

export const Option = styled(RectButton)`
  width: 50%;
  
`

export const OptionTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`

export const HistoricTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title_bold};
  margin-left: 24px;
`

export const NoTransactionsImageContainer = styled.View`
  width: 100%;
  flex: 1;

  align-items: center;
  justify-content: center;
`

export const LoadContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`