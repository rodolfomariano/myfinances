import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie } from 'victory-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { useFocusEffect } from '@react-navigation/native'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Header } from '../../components/Header'
import { HistoryCard } from '../../components/HistoryCard'
import { categories } from '../../utils/categories'
import NoTransactionsSVG from '../../assets/noTransactions.svg'

import { useAuth } from '../../hooks/auth'

import {
  Container,
  HeaderContainer,
  HeaderTitle,
  HistoryCardContainer,
  Content,
  HistoricTitle,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
  LoadContainer,
  SelectTypeOfTransactions,
  Option,
  OptionTitle,
  NoTransactionsImageContainer
} from './styles'

export interface TransactionDataProps {
  id: string
  type: 'input' | 'output'
  name: string
  amount: string
  category: string
  date: string
}

interface CategoryData {
  name: string
  total: number
  totalFormatted: string
  color: string
  percent: string
}

export function Historic() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([])
  const [selectType, setSelectType] = useState('output')

  const { user } = useAuth()
  const theme = useTheme()

  function handleDateChange(action: 'prev' | 'next') {
    setIsLoading(true)

    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1))

    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  function handleSelectType(type: 'input' | 'output') {

    if (selectType !== type) {
      setIsLoading(true)
      setSelectType(type)
    }
  }

  async function loadData() {
    const dataKey = `@myfinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const getTransactions = responseFormatted.filter((expensive: TransactionDataProps) =>
      expensive.type === selectType &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    )

    const expensiveTotal = getTransactions.reduce((accumulator: number, expensive: TransactionDataProps) => {
      return accumulator + Number(expensive.amount)
    }, 0)

    const totalByCategory: CategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0

      getTransactions.forEach((expensive: TransactionDataProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      })

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).replace('R$', 'R$ ')

        const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`

        totalByCategory.push({
          name: category.name,
          total: categorySum,
          totalFormatted: totalFormatted,
          color: category.color,
          percent: percent
        })

      }
    })

    setTotalByCategory(totalByCategory)
    setIsLoading(false)

  }

  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate, selectType]))

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <HeaderContainer>
        <Header />

        <HeaderTitle>Histórico de Transações</HeaderTitle>
      </HeaderContainer>

      <MonthSelect>
        <MonthSelectButton onPress={() => handleDateChange('prev')}>
          <SelectIcon name='chevron-left' />
        </MonthSelectButton>

        <Month>
          {format(selectedDate, 'MMMM, yyyy', { locale: ptBR }).toUpperCase()}
        </Month>

        <MonthSelectButton onPress={() => handleDateChange('next')}>
          <SelectIcon name='chevron-right' />
        </MonthSelectButton>
      </MonthSelect>

      <SelectTypeOfTransactions>
        <Option
          onPress={() => handleSelectType('input')}

        >
          <OptionTitle
            style={{
              color: selectType === 'input' ? theme.colors.attention : theme.colors.text,
              borderBottomColor: selectType === 'input' ? theme.colors.attention : theme.colors.text,
              borderBottomWidth: selectType === 'input' ? 3 : 0
            }}
          >
            Entradas
          </OptionTitle>
        </Option>
        <Option
          onPress={() => handleSelectType('output')}

        >
          <OptionTitle
            style={{
              color: selectType === 'output' ? theme.colors.attention : theme.colors.text,
              borderBottomColor: selectType === 'output' ? theme.colors.attention : theme.colors.text,
              borderBottomWidth: selectType === 'output' ? 3 : 0
            }}
          >
            Saidas
          </OptionTitle>
        </Option>
      </SelectTypeOfTransactions>

      {isLoading
        ? <LoadContainer>
          <ActivityIndicator color={theme.colors.attention} size={32} />
        </LoadContainer>

        : totalByCategory.length === 0
          ? <NoTransactionsImageContainer>
            <NoTransactionsSVG width={RFPercentage(60)} height={RFPercentage(20)} />
          </NoTransactionsImageContainer>

          : <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 16
            }}
          >


            <ChartContainer>
              <VictoryPie
                data={totalByCategory}
                x='percent'
                y='total'
                colorScale={totalByCategory.map(category => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(14),
                    fill: theme.colors.title_bold
                  }
                }}
                labelRadius={50}
                width={260}
                height={260}
              />
            </ChartContainer>


            {/* <HistoricTitle>Gastos no mês</HistoricTitle> */}
            <HistoryCardContainer>
              {
                totalByCategory.map(category => (
                  <HistoryCard
                    key={category.name}
                    title={category.name}
                    amount={category.totalFormatted}
                    color={category.color}
                  />

                ))
              }
            </HistoryCardContainer>

          </Content>
      }



    </Container>
  )
}