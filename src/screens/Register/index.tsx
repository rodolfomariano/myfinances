import React, { useState, useEffect } from 'react'
import {
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native'
import Modal from 'react-native-modal'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'

import { Header } from '../../components/Header'
import { Button } from '../../components/Form/Button'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelect } from '../../components/Form/CategorySelect'
import { CategoryToSelect } from '../CategoryToSelect'
import { InputWithHookForm } from '../../components/Form/InputWithHookForm'

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components/native';

import {
  Container,
  HeaderContainer,
  HeaderTitle,
  FormContainer,
  TransactionTypesContainer,
  Footer
} from './styles'

export interface FormData {
  name: string
  amount: string
}

const schema = Yup.object({
  name: Yup.string()
    .required('Nome obrigatório!'),
  amount: Yup.number()
    .required('Preço obrigatório!')
    .typeError('Informe um valor numérico!')
    .positive('Apenas valor positivo')
})

export function Register() {
  const [transactionTypeSelected, setTransactionTypeSelected] = useState('')
  const [isCategoryModalOpen, setIsModalCategoryOpen] = useState(false)

  const { user } = useAuth()
  const theme = useTheme()

  const dataKey = `@myfinances:transactions_user:${user.id}`

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const navigation: any = useNavigation()

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  function handleTransactionTypeSelect(type: 'input' | 'output') {
    setTransactionTypeSelected(type)
  }

  function handleOpenModalSelectCategory() {
    setIsModalCategoryOpen(!isCategoryModalOpen)
  }

  function handleCloseModalSelectCategory() {
    setIsModalCategoryOpen(!isCategoryModalOpen)
  }

  async function handleRegister(form: FormData) {
    if (!transactionTypeSelected) return Alert.alert('Atenção', 'Você tem que selecionar um tipo de transação')
    if (category.key === 'category') return Alert.alert('Atenção', 'Você tem que selecionar uma categoria')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionTypeSelected,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

      setTransactionTypeSelected('')
      setCategory({
        key: 'category',
        name: 'Categoria'
      })
      reset()

      navigation.navigate('Transações')

    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível cadastrar!')
    }

  }

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey)

    }
    loadData()

    // async function removeAll() {
    //   await AsyncStorage.removeItem(dataKey)
    // }
    // removeAll()

  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <HeaderContainer>
          <Header />

          <HeaderTitle>Cadastrar nova Transação</HeaderTitle>
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
          />
          <InputWithHookForm
            name='amount'
            control={control}
            placeholder='Preço'
            keyboardType='numeric'
            errorMessage={errors.amount && errors.amount?.message}
            placeholderTextColor={theme.colors.text}
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

          <CategorySelect title={category.name} onPress={handleOpenModalSelectCategory} />

          <Footer>
            <Button title='Cadastrar' onPress={handleSubmit(handleRegister)} />

          </Footer>
        </FormContainer>

        <Modal
          isVisible={isCategoryModalOpen}
          onBackdropPress={() => setIsModalCategoryOpen(!isCategoryModalOpen)}
        >
          <CategoryToSelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModalSelectCategory}

          />

        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  )
}