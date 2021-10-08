import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Modal from "react-native-modal"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'

import { Header } from '../../components/Header'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard } from '../../components/TransactionCard'

import { useAuth } from '../../hooks/auth'

import {
  Container,
  HeaderContainer,
  HighlightCardContainer,
  TransactionContainer,
  Title,
  TransactionsList,
  LoadContainer,
  TransactionsHeader,
  RefreshButton,
} from './styles'
import { EditTransaction } from '../EditTransaction'

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
  const [transactionToModal, setTransactionToModal] = useState<TransactionDataProps>({} as TransactionDataProps)

  const { user } = useAuth()
  const theme = useTheme()


  function handleOpenModal(item: TransactionDataProps) {
    setIsModalOpen(!isModalOpen)
    setTransactionToModal(item)
  }

  function refreshContainer() {
    setIsLoading(true)
    setTimeout(() => {
      loadData()

    }, 300)
  }

  function getLastTransactionDate(collection: TransactionDataProps[], type: 'input' | 'output') {
    const collectionFiltered = collection.filter(transaction => transaction.type === type)

    if (collectionFiltered.length === 0) {
      return '0'
    }

    const lastTransaction =
      Math.max.apply(Math,
        collectionFiltered.map(transaction => new Date(transaction.date).getTime())
      )

    return Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
    }).format(new Date(lastTransaction))

  }

  async function loadData() {
    const dataKey = `@myfinances:transactions_user:${user.id}`
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
        }).replace('R$', 'R$ ')

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

      const totalInterval = `Do dia 01 ao ${lastTransactionExpensive ? lastTransactionExpensive : lastTransactionEntries}`


      const total = entriesTotal - expensiveTotal

      setHighlightData({
        entries: {
          total: entriesTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).replace('R$', 'R$ '),
          lastTransaction: lastTransactionEntries
        },
        expensive: {
          total: expensiveTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).replace('R$', 'R$ '),
          lastTransaction: lastTransactionExpensive
        },
        balance: {
          total: total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).replace('R$', 'R$ '),
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
              lastTransaction={
                highlightData?.entries?.lastTransaction !== '0' && highlightData?.entries
                  ? `Última entrada dia ${highlightData?.entries?.lastTransaction}`
                  : 'Zero entradas adicionadas'
              }
              type='up'
            />
            <HighlightCard
              title='Saida'
              amount={highlightData?.expensive ? highlightData?.expensive?.total : 'R$ 0,00'}
              lastTransaction={
                highlightData?.expensive?.lastTransaction !== '0' && highlightData?.entries
                  ? `Última saida dia ${highlightData?.expensive?.lastTransaction}`
                  : 'Zero saidas adicionadas'
              }
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
            <TransactionsHeader>
              <Title>Transações</Title>

              <RefreshButton
                onPress={refreshContainer}
              >
                <Feather name='refresh-cw' size={20} color={theme.colors.text} />
              </RefreshButton>
            </TransactionsHeader>

            <TransactionsList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TransactionCard
                  onPress={() => handleOpenModal(item)}
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
            <EditTransaction
              transaction={transactionToModal}
              closeModal={() => setIsModalOpen(!isModalOpen)}
              setLoadingData={refreshContainer}
            />
            {/* <TransactionCard
              onPress={handleOpenModal}
              data={transactions[0]}
            /> */}
          </Modal>
        </>
      }

    </Container>
  )
}