import React from 'react'

import {
  Container,
  Header,
  Title,
  Icon,
  Content,
  Amount,
  LastTransaction
} from './styles'

interface HighlightCardProps {
  title: string
  amount: string
  lastTransaction: string
  type: 'up' | 'down' | 'total'
}

export function HighlightCard({ title, amount, lastTransaction, type }: HighlightCardProps) {
  return (
    <Container type={type}>
      <Header>
        <Title>{title}</Title>
        <Icon
          name={type === 'up' ? 'arrow-up-circle' : type === 'down' ? 'arrow-down-circle' : 'dollar-sign'}
          type={type}
        />
      </Header>

      <Content>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction>
          {lastTransaction}
        </LastTransaction>
      </Content>
    </Container>
  )
}