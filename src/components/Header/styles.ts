import { RectButton } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
  
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 8px;
`

export const User = styled.View`
  margin-left: 16px;
`

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.title_regular};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.title_bold};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
`
export const PowerOffButton = styled(RectButton)`
  padding: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.error_light};

  align-items: center;
  justify-content: center;
`