import styled from "styled-components/native"
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize"
import { RectButton } from "react-native-gesture-handler"

export const Container = styled.View`
  position: relative;
`
export const Header = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: ${RFValue(18)}px ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 8px;
`

export const Category = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.light};
`

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(20)}px;
`

export const Content = styled.View`
  position: absolute;
  top: ${RFValue(60)}px;
  z-index: 200;
  width: 100%;
  height: 160px;
  
`

export const TypeIcon = styled(Feather)`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
  margin-left: 16px;
`
export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text};
`