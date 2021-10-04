import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Modal from "react-native-modal"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'

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
  LoadContainer
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
  lastTransaction: string
}

interface HighlightDataProps {
  entries: HighlightProps,
  expensive: HighlightProps
  balance: HighlightProps
}

export function ListingTransactions() {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transactions, setTransactions] = useState<TransactionDataProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightDataProps>({} as HighlightDataProps)

  const theme = useTheme()

  function handleOpenModal() {
    setIsModalOpen(!isModalOpen)
  }

  function getLastTransactionDate(collection: TransactionDataProps[], type: 'input' | 'output') {
    const lastTransaction =
      Math.max.apply(Math,
        collection
          .filter(transaction => transaction.type === type)
          .map(transaction => new Date(transaction.date).getTime())
      )

    return Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
    }).format(new Date(lastTransaction))

  }

  async function loadData() {
    const dataKey = '@myfinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)

    if (response) {

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
        }).format(new Date(item?.date))

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

      const lastTransactionEntries = getLastTransactionDate(transactions, 'input')
      const lastTransactionExpensive = getLastTransactionDate(transactions, 'output')
      const totalInterval = `01 a ${lastTransactionExpensive}`

      const total = entriesTotal - expensiveTotal

      setHighlightData({
        entries: {
          total: entriesTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: lastTransactionEntries
        },
        expensive: {
          total: expensiveTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: lastTransactionExpensive
        },
        balance: {
          total: total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: totalInterval
        }
      })

      setIsLoading(false)

    } else {
      setIsLoading(false)
    }
  }


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



      {isLoading
        ? <LoadContainer>
          <ActivityIndicator color={theme.colors.attention} size={32} />
        </LoadContainer>
        : <>
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
              amount={highlightData?.entries ? highlightData?.entries?.total : 'R$ 0,00'}
              lastTransaction={highlightData?.entries ? `Última entrada dia ${highlightData?.entries?.lastTransaction}` : 'Zero entradas adicionadas'}
              type='up'
            />
            <HighlightCard
              title='Saida'
              amount={highlightData?.expensive ? highlightData?.expensive?.total : 'R$ 0,00'}
              lastTransaction={highlightData?.expensive ? `Última saida dia ${highlightData?.expensive?.lastTransaction}` : 'Zero saidas adicionadas'}
              type='down'
            />
            <HighlightCard
              title='Saldo'
              amount={highlightData?.balance ? highlightData?.balance?.total : 'R$ 0,00'}
              lastTransaction={highlightData?.balance?.lastTransaction}
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
        </>
      }

    </Container>
  )
}