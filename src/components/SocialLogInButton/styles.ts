import styled from "styled-components/native"
import { RectButton } from "react-native-gesture-handler"
import { RFValue } from "react-native-responsive-fontsize"

export const Container = styled(RectButton)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 8px 24px;
  border-radius: 8px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

`
export const LogoContainer = styled.View`
  width: 50px;
  height: 50px;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.text};

  
  justify-content: center;
`

export const TitleContainer = styled.View`
  flex: 1;
  align-items: center;
`

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.text};
`