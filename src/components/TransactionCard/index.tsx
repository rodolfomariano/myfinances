import React from 'react'
import { RectButtonProps } from "react-native-gesture-handler"
import { categories } from '../../utils/categories'

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


interface TransactionCardProps extends RectButtonProps {
  data: {
    type: 'input' | 'output'
    name: string
    amount: string
    category: string
    date: string
  }
}

export function TransactionCard({ data, ...rest }: TransactionCardProps) {
  const category = categories.filter(item => item.key === data.category)[0]

  return (
    <Container {...rest}>
      <Title>{data.name}</Title>
      <Amount
        type={data.type}
      >
        {data.type === 'input' ? data.amount : `- ${data.amount}`}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>

    </Container>
  )
}