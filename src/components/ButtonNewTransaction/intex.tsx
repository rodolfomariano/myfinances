import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import {
  Container,
  Button,
  EditCurveOutsideLeft,
  EditCurveOutsideRight,
  CurveOutsideLeft,
  CurveOutsideLeftCurve,
  CurveOutsideRight,
  CurveOutsideRightCurve
} from './styles'

interface ButtonNewTransactionProps {
  color: string
}

export function ButtonNewTransaction({ color }: ButtonNewTransactionProps) {
  return (
    <Container>
      <CurveOutsideLeftCurve />
      <CurveOutsideLeft />
      <EditCurveOutsideLeft />
      <Button>
        <AntDesign name='plus' color={color} size={24} />
      </Button>
      <EditCurveOutsideRight />
      <CurveOutsideRight />
      <CurveOutsideRightCurve />

    </Container >
  )
}