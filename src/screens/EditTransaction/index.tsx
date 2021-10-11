import React, { useState, useEffect } from 'react'
import { useTheme } from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { Feather } from '@expo/vector-icons'
import Modal from 'react-native-modal'

import { useAuth } from '../../hooks/auth'

import { CategorySelect } from '../../components/Form/CategorySelect'
import { InputWithHookForm } from '../../components/Form/InputWithHookForm'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategoryToSelect } from '../CategoryToSelect'

import { categories } from '../../utils/categories'

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
} from './styles'
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Form/Button';
import { EditAndRemoveButton } from '../../components/Form/EditAndRemoveButton';
import { ButtonSelectCategory } from '../../components/Form/ButtonSelectCategory';

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

export interface FormData {
  name: string
  amount: string
}


export function EditTransaction({ transaction, closeModal, setLoadingData }: EditTransactionProps) {
  // const [isLoading, setIsLoading] = useState(false)
  const [transactionTypeSelected, setTransactionTypeSelected] = useState(transaction.type)
  const [transactionEdited, setTransactionEdited] = useState<TransactionDataProps>({} as TransactionDataProps)
  // const [dateFormatted, setDateFormatted] = useState('')
  const [isCategoryModalOpen, setIsModalCategoryOpen] = useState(false)
  const [defaultAmount, setDefaultAmount] = useState(0)
  const [defaultName, setDefaultName] = useState('')

  const { user } = useAuth()
  const theme = useTheme()

  const schema = Yup.object({
    name: Yup.string()
      .required('Nome obrigatório!')
      .default(defaultName),
    amount: Yup.number()
      .required('Preço obrigatório!')
      .typeError('Informe um valor numérico!')
      .positive('Apenas valor positivo')
      .default(defaultAmount)
  })

  const transactionType = categories.find(category => category.key === transaction.category && category)

  const [category, setCategory] = useState({
    key: transactionType!.key,
    name: transactionType!.name
  })


  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const dataKey = `@myfinances:transactions_user:${user.id}`

  async function findTransaction() {
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    try {
      const transactionData: TransactionDataProps[] =
        transactions.filter((transactionFound: TransactionDataProps) => {

          if (transactionFound.id === transaction.id) {
            setDefaultAmount(Number(transactionFound.amount))
            setDefaultName(transactionFound.name)
          }

        })



    } catch (error) {
      console.log(error)
    }

  }

  async function handleEditTransaction(form: FormData) {
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    try {
      const transactionData: TransactionDataProps[] = transactions.map((transactionFound: TransactionDataProps) => {


        if (transactionFound.id === transaction.id) {
          const transactionEdited = {
            id: transactionFound.id,
            type: transactionTypeSelected,
            name: form.name,
            amount: form.amount,
            category: category.key,
            date: transactionFound.date
          }

          return transactionEdited

        }
        return transactionFound

      })

      await AsyncStorage.setItem(dataKey, JSON.stringify(transactionData))

      closeModal()

      setTimeout(() => {
        setLoadingData()
      }, 1000)


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

      setTimeout(() => {
        setLoadingData()
      }, 1000)

    } catch (error) {
      console.log(error)
    }
  }

  function handleTransactionTypeSelect(type: 'input' | 'output') {
    setTransactionTypeSelected(type)
  }

  function handleOpenModalSelectCategory() {
    setIsModalCategoryOpen(!isCategoryModalOpen)
  }

  function handleCloseModalSelectCategory() {
    setIsModalCategoryOpen(!isCategoryModalOpen)
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
          defaultValue={String(defaultAmount)}
        />

        <ButtonSelectCategory
          category={category}
          setCategory={setCategory}
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

        {/* <CategorySelect
          title={category.name}
          onPress={handleOpenModalSelectCategory} /> */}


        <Footer>

          <EditAndRemoveButton
            title='Editar'
            type='edit'
            onPress={handleSubmit(handleEditTransaction)}
          />

          <EditAndRemoveButton
            title='Deletar'
            type='remove'
            onPress={handleRemoveTransaction}
          />

        </Footer>
      </FormContainer>
      {/* </>
      } */}

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
  )
}