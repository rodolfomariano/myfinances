import styled from "styled-components/native"
import { FlatList } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import { getBottomSpace } from "react-native-iphone-x-helper"

import { TransactionDataProps } from '.'
import { RectButton } from "react-native-gesture-handler"

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};

`
export const HeaderContainer = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  
  background-color: ${({ theme }) => theme.colors.shape_dark};
  padding: 0 24px;
`

export const HighlightCardContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 24,
  }
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`
export const TransactionContainer = styled.View`
  flex: 1;

  margin-top: ${RFPercentage(8)}px;
  padding: 0 24px;
`

export const TransactionsHeader = styled.View`
  width: 100%;
  margin-bottom: 16px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const RefreshButton = styled(RectButton)`
  padding: 8px;
  border-radius: 8px;
`
export const TransactionsFilterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 16px;
`

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title_regular};
  font-family: ${({ theme }) => theme.fonts.light};
`

export const TransactionsList = styled(FlatList as new () => FlatList<TransactionDataProps>).attrs({
  contentContainerStyle: {
    paddingHorizontal: getBottomSpace()
  },
  showsVerticalScrollIndicator: false
})`
  margin-bottom: 16px;

`

export const LoadContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`