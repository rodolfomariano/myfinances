import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Header } from '../../components/Header'
import { HistoryCard } from '../../components/HistoryCard'
import { categories } from '../../utils/categories'

import {
  Container,
  HeaderContainer,
  HeaderTitle,
  HistoryCardContainer
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
  total: string
  color: string
}

export function Historic() {
  const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([])

  async function loadData() {
    const dataKey = '@myfinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted.filter((expensive: TransactionDataProps) => expensive.type === 'output')

    const totalByCategory: CategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0

      expensives.forEach((expensive: TransactionDataProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      })

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        totalByCategory.push({
          name: category.name,
          total: total,
          color: category.color
        })

      }
    })

    setTotalByCategory(totalByCategory)

  }

  useEffect(() => {
    loadData()
  }, [])

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

      <HistoryCardContainer>

      {
        totalByCategory.map(category => (
          <HistoryCard
            key={category.name}
            title={category.name}
            amount={category.total}
            color={category.color}
          />

        ))
      }
      </HistoryCardContainer>


    </Container>
  )
}