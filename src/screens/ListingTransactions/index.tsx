import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { StatusBar } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import Modal from "react-native-modal"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'

import { Header } from '../../components/Header'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard } from '../../components/TransactionCard'
import { EditTransaction } from '../EditTransaction'
import { ButtonTransactionFilter } from '../../components/ButtonTransactionFilter'
import NoTransactionsSVG from '../../assets/noTransactions.svg'

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
  TransactionsFilterContainer,
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

interface HighlightProps {
  total: string
  lastTransaction: string
}

interface HighlightDataProps {
  entries: HighlightProps,
  expensive: HighlightProps
  balance: HighlightProps
}

interface FilterTransactions {
  toActive: 'all' | 'newest' | 'inputs' | 'outputs'
}

export function ListingTransactions() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transactions, setTransactions] = useState<TransactionDataProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightDataProps>({} as HighlightDataProps)
  const [transactionToModal, setTransactionToModal] = useState<TransactionDataProps>({} as TransactionDataProps)
  const [filterTransactions, setFilterTransactions] = useState('all')
  const [lastTransactionDate, setLestTransactionDate] = useState('')

  const { user } = useAuth()
  const theme = useTheme()


  function handleOpenModal(item: TransactionDataProps) {
    setIsModalOpen(!isModalOpen)
    setTransactionToModal(item)
  }

  function handleCloseModal() {
    setIsModalOpen(!isModalOpen)
  }

  function handleFilterTransactions(type: string) {
    setFilterTransactions(type)
    filterTransactions !== type && setIsLoadingTransactions(true)
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

      const reverseTransactions = transactions.slice().reverse()

      if (reverseTransactions.length > 0) {
        setLestTransactionDate(`Do dia 1 a ${Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: 'long',
        }).format(new Date(reverseTransactions[0].date))}`)
      } else {
        setLestTransactionDate('')
      }


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

      switch (filterTransactions) {
        case 'all':
          setTransactions(transactionsFormatted)
          break;
        case 'newest':
          const newest = transactionsFormatted.reverse()
          setTransactions(newest)
          break;
        case 'inputs':
          const inputsTransactions = transactionsFormatted.filter(transaction => transaction.type === 'input')
          setTransactions(inputsTransactions)
          break;
        case 'outputs':
          const outputsTransactions = transactionsFormatted.filter(transaction => transaction.type === 'output')
          setTransactions(outputsTransactions)
          break;
      }

      const lastTransactionEntries = getLastTransactionDate(transactions, 'input')
      const lastTransactionExpensive = getLastTransactionDate(transactions, 'output')

      const totalInterval = `Do dia 1 a ${lastTransactionExpensive ? lastTransactionExpensive : lastTransactionEntries}`


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
      setIsLoadingTransactions(false)

    } else {
      setIsLoading(false)
      setIsLoadingTransactions(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [filterTransactions])


  useFocusEffect(useCallback(() => {
    loadData()
    setFilterTransactions('all')

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
                  : 'Nenhuma entrada registrada'
              }
              type='up'
            />
            <HighlightCard
              title='Saida'
              amount={highlightData?.expensive ? highlightData?.expensive?.total : 'R$ 0,00'}
              lastTransaction={
                highlightData?.expensive?.lastTransaction !== '0' && highlightData?.entries
                  ? `Última saida dia ${highlightData?.expensive?.lastTransaction}`
                  : 'Nenhuma saida registrada'
              }
              type='down'
            />
            <HighlightCard
              title='Saldo'
              amount={highlightData?.balance ? highlightData?.balance?.total : 'R$ 0,00'}
              lastTransaction={lastTransactionDate}
              type='total'
            />

          </HighlightCardContainer>



          <TransactionContainer>



            <TransactionsHeader>
              <Title>{`${transactions.length === 0 ? 'Nenhuma' : transactions.length + ' - '}`} {transactions.length <= 1 ? 'Tranzação' : 'Tranzações'}</Title>

              <RefreshButton
                onPress={refreshContainer}
              >
                <Feather name='refresh-cw' size={20} color={theme.colors.text} />
              </RefreshButton>
            </TransactionsHeader>

            <TransactionsFilterContainer>

              <ButtonTransactionFilter
                title='Todos'
                type='all'
                onPress={() => handleFilterTransactions('all')}
                toActive={filterTransactions}
              />
              <ButtonTransactionFilter
                title='Mais novas'
                type='newest'
                onPress={() => handleFilterTransactions('newest')}
                toActive={filterTransactions}
              />
              <ButtonTransactionFilter
                title='Entradas'
                type='inputs'
                onPress={() => handleFilterTransactions('inputs')}
                toActive={filterTransactions}
              />
              <ButtonTransactionFilter
                title='Saidas'
                type='outputs'
                onPress={() => handleFilterTransactions('outputs')}
                toActive={filterTransactions}
              />


            </TransactionsFilterContainer>

            {isLoadingTransactions
              ? <LoadContainer>
                <ActivityIndicator color={theme.colors.attention} size={32} />
              </LoadContainer>
              : transactions.length === 0
                ? <NoTransactionsImageContainer>
                  <NoTransactionsSVG width={RFPercentage(60)} height={RFPercentage(20)} />
                </NoTransactionsImageContainer>
                : <TransactionsList
                  data={transactions}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <TransactionCard
                      onPress={() => handleOpenModal(item)}
                      data={item}
                    />
                  )}
                />





            }



          </TransactionContainer>


          <Modal
            isVisible={isModalOpen}
            onBackdropPress={() => setIsModalOpen(!isModalOpen)}
            animationOutTiming={800}
          >
            <EditTransaction
              transaction={transactionToModal}
              closeModal={handleCloseModal}
              setLoadingData={refreshContainer}
            />
          </Modal>
        </>
      }

    </Container>
  )
}