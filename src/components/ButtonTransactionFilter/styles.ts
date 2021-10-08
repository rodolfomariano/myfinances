import styled from "styled-components/native"
import { RectButton } from "react-native-gesture-handler"
import { RFValue } from "react-native-responsive-fontsize"

interface ButtonTransactionFilterProps {
  isActive: boolean
}

export const Container = styled(RectButton) <ButtonTransactionFilterProps>`
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.action_light : theme.colors.shape
  };
  padding: 8px 16px;
  border-radius: 8px;
`

export const Title = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
`