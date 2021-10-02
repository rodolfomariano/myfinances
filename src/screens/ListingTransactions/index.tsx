import React, { useState, useEffect, useCallback } from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Modal from "react-native-modal"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import { Header } from '../../components/Header'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard } from '../../components/TransactionCard'

import {
  Container,
  HeaderContainer,
  HighlightCardContainer,
  TransactionContainer,
  Title,
  TransactionsList,
} from './styles'

export interface TransactionDataProps {
  id: string
  type: 'input' | 'output'
  name: string
  amount: string
  category: string
  date: string
}

interface HighlightProps {
  total: string
}

interface HighlightDataProps {
  entries: HighlightProps,
  expensive: HighlightProps
  balance: HighlightProps
}

export function ListingTransactions() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transactions, setTransactions] = useState<TransactionDataProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightDataProps>({} as HighlightDataProps)

  function handleOpenModal() {
    setIsModalOpen(!isModalOpen)
  }

  async function loadData() {
    const dataKey = '@myfinances:transactions'

    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormatted: TransactionDataProps[] = transactions.map((item: TransactionDataProps) => {

      if (item.type === 'input') {
        entriesTotal += Number(item.amount)

      } else {
        expensiveTotal += Number(item.amount)
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date))

      return {
        id: item.id,
        name: item.name,
        amount: amount,
        type: item.type,
        category: item.category,
        date: date
      }

    })


    setTransactions(transactionsFormatted)

    const total = entriesTotal - expensiveTotal

    setHighlightData({
      entries: {
        total: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensive: {
        total: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      balance: {
        total: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })

  }



  useEffect(() => {
    loadData()

  }, [])

  useFocusEffect(useCallback(() => {
    loadData()
  }, []))

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <HeaderContainer>
        <Header />
      </HeaderContainer>

      <HighlightCardContainer
        snapToAlignment='start'
        scrollEventThrottle={16}
        snapToOffsets={[...Array(3)].
          map((value, index) => index * (RFValue(300)) + (index - 1) * 16)}
      >
        <HighlightCard
          title='Entrada'
          amount={highlightData?.entries?.total}
          lastTransaction='A ultima entrada foi em 14 de abril'
          type='up'
        />
        <HighlightCard
          title='Saida'
          amount={highlightData?.expensive?.total}
          lastTransaction='A ultima saida foi em 22 de abril'
          type='down'
        />
        <HighlightCard
          title='Saldo'
          amount={highlightData?.balance?.total}
          lastTransaction='A ultima saida foi em 22 de abril'
          type='total'
        />

      </HighlightCardContainer>

      <TransactionContainer>
        <Title>Transações</Title>

        <TransactionsList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TransactionCard
              onPress={handleOpenModal}
              data={item}
            />
          )}
        />
      </TransactionContainer>

      <Modal
        isVisible={isModalOpen}
        onBackdropPress={() => setIsModalOpen(!isModalOpen)}
        animationOutTiming={800}
      >
        <TransactionCard
          onPress={handleOpenModal}
          data={transactions[0]}
        />
      </Modal>

    </Container>
  )
}