import styled, { css } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

interface TypeProps {
  type: 'up' | 'down' | 'total'
}

export const Container = styled.View<TypeProps>`
  width: ${RFValue(300)}px;

  background-color: ${({ type, theme }) => type === 'up'
    ? theme.colors.success_light
    : type === 'down'
      ? theme.colors.error_light
      : theme.colors.action_light
  };
  
  border-radius: 8px;
  padding: 16px 24px 42px;
  margin-right: 16px;

  justify-content: space-between;
`
export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title_regular};
`
export const Icon = styled(Feather) <TypeProps>`
  font-size: ${RFValue(32)}px;

  color: ${({ type, theme }) => type === 'up'
    ? theme.colors.success
    : type === 'down'
      ? theme.colors.error
      : theme.colors.action
  }
`
export const Content = styled.View`
  margin-top: 24px;
`
export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ type, theme }) => type === 'up'
    ? theme.colors.success
    : type === 'down'
      ? theme.colors.error
      : theme.colors.title_regular
  }
`
export const LastTransaction = styled.Text`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: -8px;
`