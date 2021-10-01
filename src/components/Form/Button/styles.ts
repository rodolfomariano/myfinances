import styled from "styled-components/native"
import { RectButton } from "react-native-gesture-handler"
import { RFValue } from "react-native-responsive-fontsize"

export const Container = styled(RectButton)`
  width: 100%;
  padding: 16px 0;
  background-color: ${({ theme }) => theme.colors.action};
  border-radius: 8px;
  
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title_bold};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`