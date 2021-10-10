import styled from "styled-components/native"
import { RectButton } from "react-native-gesture-handler"
import { RFValue } from "react-native-responsive-fontsize"

interface ButtonProps {
  type: 'edit' | 'remove'
}

export const Container = styled(RectButton) <ButtonProps>`
  width: 49%;
  background-color: ${({ theme, type }) => type === 'remove' ? theme.colors.attention_light : theme.colors.action_light};
  border-radius: 8px;
  padding: 16px 32px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`