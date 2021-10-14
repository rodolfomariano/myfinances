import styled from "styled-components/native"
import { TextInput } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize"

export const Container = styled(TextInput)`
  width: 100%;
  padding: ${RFValue(16)}px ${RFValue(18)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.light};
  margin-bottom: 8px;

`