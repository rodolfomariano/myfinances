import styled from "styled-components/native"
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize"

interface TransactionTypeProps {
  type: 'input' | 'output'
  isActive: boolean
}

export const Container = styled(TouchableOpacity) <TransactionTypeProps>`
  width: 49%;
  padding: 16px 0;
  border-radius: 8px;

  border: 1.5px solid ${({ theme, type, isActive }) => type === 'input'
    ? isActive ? theme.colors.background : theme.colors.shape
    : isActive ? theme.colors.background : theme.colors.shape
  };
  
  background-color: ${({ theme, type, isActive }) => type === 'input'
    ? isActive ? theme.colors.success_light : theme.colors.background
    : isActive ? theme.colors.error_light : theme.colors.background
  };

  flex-direction: row;
  justify-content: center;
`
export const Icon = styled(Feather) <TransactionTypeProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) => type === 'input'
    ? theme.colors.success
    : theme.colors.error
  };
`

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.title_regular};
  margin-left: 16px;
`