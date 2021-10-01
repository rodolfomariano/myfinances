import styled from "styled-components/native"
import { RFValue } from "react-native-responsive-fontsize"

export const Container = styled.View`
  width: 100%;
`

export const ErrorText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: ${RFValue(11)}px;
  color: ${({ theme }) => theme.colors.error};
`