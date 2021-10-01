import styled from "styled-components/native"
import { RFValue } from "react-native-responsive-fontsize"
import { Feather } from '@expo/vector-icons'
import { FlatList } from "react-native"
import { RectButton, GestureHandlerRootView } from "react-native-gesture-handler"

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  max-height: ${RFValue(500)}px;
  background-color: ${({ theme }) => theme.colors.background};
  margin: 24px;
  padding-bottom: 16px;
`

export const Header = styled.View`
  position: relative;
  width: 100%;
  height: ${RFValue(100)}px;
  
  background-color: ${({ theme }) => theme.colors.shape_dark};
  padding: 0 24px 24px;

  align-items: center;
  justify-content: flex-end;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.light};
`
export const CloseModalButton = styled(RectButton)`
  position: absolute;
  top: 20px;
  right: 20px;

`

export const CloseIcon = styled(Feather)``

export const FlatListContainer = styled(FlatList)`

`

export const CategoryItem = styled(RectButton)`
  width: 100%;
  padding: ${RFValue(15)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  /* margin-bottom: 8px; */

  flex-direction: row;
  align-items: center;
`
export const Icon = styled(Feather)`
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