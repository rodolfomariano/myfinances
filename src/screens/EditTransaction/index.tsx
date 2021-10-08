import React, { useState, useEffect } from 'react'
import { useTheme } from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { Feather } from '@expo/vector-icons'

import { useAuth } from '../../hooks/auth'

import { CategorySelect } from '../../components/Form/CategorySelect'
import { Button } from '../../components/Form/Button'
import { InputWithHookForm } from '../../components/Form/InputWithHookForm'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'

import {
  Container,
  HeaderContainer,
  TransactionDate,
  Title,
  ExitIcon,
  ExitButton,
  LoadContainer,
  FormContainer,
  TransactionTypesContainer,
  Footer,
  ButtonEdit,
  ButtonRemove,
  ButtonTitle
} from './styles'
import { useForm } from 'react-hook-form';

interface EditTransactionProps {
  transaction: TransactionDataProps
  closeModal: () => void
  setLoadingData: () => void
}

interface TransactionDataProps {
  id: string
  type: 'input' | 'output'
  name: string
  amount: string
  category: string
  date: string
}

const schema = Yup.object({
  name: Yup.string()
    .required('Nome obrigatório!'),
  amount: Yup.number()
    .required('Preço obrigatório!')
    .typeError('Informe um valor numérico!')
    .positive('Apenas valor positivo')
})

export function EditTransaction({ transaction, closeModal, setLoadingData }: EditTransactionProps) {
  // const [isLoading, setIsLoading] = useState(false)
  const [transactionTypeSelected, setTransactionTypeSelected] = useState(transaction.type)
  const [transactionEdited, setTransactionEdited] = useState<TransactionDataProps>({} as TransactionDataProps)
  // const [dateFormatted, setDateFormatted] = useState('')

  const { user } = useAuth()
  const theme = useTheme()


  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const dataKey = `@myfinances:transactions_user:${user.id}`

  async function findTransaction() {
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    try {
      const transactionData: TransactionDataProps[] =
        transactions.filter((transactionFound: TransactionDataProps) => transactionFound.id === transaction.id && transactionFound)

      // console.log(transactionData)

    } catch (error) {
      console.log(error)
    }

  }

  async function handleRemoveTransaction() {

    // await AsyncStorage.removeItem(dataKey)
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    try {
      const removeTransaction = transactions.filter((transactionFound: TransactionDataProps) => transactionFound.id !== transaction.id && transactionFound)

      await AsyncStorage.setItem(dataKey, JSON.stringify(removeTransaction))
      closeModal()
      setLoadingData()
    } catch (error) {
      console.log(error)
    }
  }

  function handleTransactionTypeSelect(type: 'input' | 'output') {
    setTransactionTypeSelected(type)
  }

  useEffect(() => {
    findTransaction()

  }, [])


  return (
    <Container>
      {/* {isLoading
        ? <LoadContainer>
          <ActivityIndicator color={theme.colors.attention} size={32} />
        </LoadContainer>

        : <> */}
      <HeaderContainer>
        <ExitButton onPress={closeModal}>
          <ExitIcon
            name='close'

          />
        </ExitButton>

        <TransactionDate>{transaction.date}</TransactionDate>
        <Title>{transaction.name}</Title>
      </HeaderContainer>

      <FormContainer>
        <InputWithHookForm
          name='name'
          control={control}
          placeholder='Nome'
          autoCapitalize='sentences'
          autoCorrect={false}
          errorMessage={errors.name && errors.name?.message}
          placeholderTextColor={theme.colors.text}
          defaultValue={transaction.name}
        />
        <InputWithHookForm
          name='amount'
          control={control}
          placeholder='Preço'
          keyboardType='numeric'
          errorMessage={errors.amount && errors.amount?.message}
          placeholderTextColor={theme.colors.text}
          defaultValue={transaction.amount}
        />

        <TransactionTypesContainer>
          <TransactionTypeButton
            title='Entrada'
            type='input'
            onPress={() => handleTransactionTypeSelect('input')}
            isActive={transactionTypeSelected === 'input'}
          />
          <TransactionTypeButton
            title='Saida'
            type='output'
            onPress={() => handleTransactionTypeSelect('output')}
            isActive={transactionTypeSelected === 'output'}
          />
        </TransactionTypesContainer>

        <CategorySelect title={transaction.category} onPress={() => { }} />

        <Footer>

          <ButtonEdit
            onPress={() => console.log('Epa')}
          >
            <Feather name='edit-2' size={20} color={theme.colors.text} />
            <ButtonTitle>Editar</ButtonTitle>
          </ButtonEdit>

          <ButtonRemove
            onPress={handleRemoveTransaction}
          >
            <Feather name='trash' size={20} color={theme.colors.text} />
            <ButtonTitle>Deletar</ButtonTitle>
          </ButtonRemove>
        </Footer>
      </FormContainer>
      {/* </>
      } */}

    </Container>
  )
}