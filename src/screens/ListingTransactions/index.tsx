import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Modal from "react-native-modal"

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
  title: string
  amount: string
  category: {
    name: string
    icon: string
  }
  date: string
}

export function ListingTransactions() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleOpenModal() {
    setIsModalOpen(!isModalOpen)
  }

  const data: TransactionDataProps[] = [
    {
      id: '1',
      type: 'input',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'vendas',
        icon: 'dollar-sign'
      },
      date: '14/08/2021'
    },
    {
      id: '2',
      type: 'output',
      title: 'Compra no mercado',
      amount: 'R$ 600,80',
      category: {
        name: 'mercado',
        icon: 'coffee'
      },
      date: '14/08/2021'
    },
    {
      id: '3',
      type: 'output',
      title: 'Compra no mercado',
      amount: 'R$ 600,80',
      category: {
        name: 'mercado',
        icon: 'shopping-bag'
      },
      date: '14/08/2021'
    }
  ]

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
          amount='R$ 17.400,00'
          lastTransaction='A ultima entrada foi em 14 de abril'
          type='up'
        />
        <HighlightCard
          title='Saida'
          amount='R$ 1.400,00'
          lastTransaction='A ultima saida foi em 22 de abril'
          type='down'
        />
        <HighlightCard
          title='Total'
          amount='R$ 16.000,00'
          lastTransaction='A ultima saida foi em 22 de abril'
          type='total'
        />

      </HighlightCardContainer>

      <TransactionContainer>
        <Title>Transações</Title>

        <TransactionsList
          data={data}
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
          data={data[0]}
        />
      </Modal>

    </Container>
  )
}