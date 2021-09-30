import React from 'react'
import { RectButtonProps } from "react-native-gesture-handler"

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles'

interface CategoryProps {
  name: string
  icon: string
}

interface TransactionCardProps extends RectButtonProps {
  data: {
    type: 'input' | 'output'
    title: string
    amount: string
    category: CategoryProps
    date: string
  }
}

export function TransactionCard({ data, ...rest }: TransactionCardProps) {
  return (
    <Container {...rest}>
      <Title>{data.title}</Title>
      <Amount
        type={data.type}
      >
        {data.type === 'input' ? data.amount : `- ${data.amount}`}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>

    </Container>
  )
}