import styled from "styled-components/native"
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize"
import { RectButton } from "react-native-gesture-handler"

interface TransactionProps {
  type: 'input' | 'output'
}

export const Container = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.shape_dark};
  padding: 16px 24px;
  border-radius: 8px;
  margin-bottom: 8px;
`
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.title_regular};
`

export const Amount = styled.Text<TransactionProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme, type }) =>
    type === 'input'
      ? theme.colors.success
      : theme.colors.error
  };
`

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`

export const CategoryName = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  margin-left: 8px;
  font-size: ${RFValue(14)}px;
`

export const Date = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`