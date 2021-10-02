import React, { useState } from 'react'
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

import { Header } from '../../components/Header'
import { Input } from '../../components/Form/Input'
import { Button } from '../../components/Form/Button'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelect } from '../../components/Form/CategorySelect'
import { CategoryToSelect } from '../CategoryToSelect'
import { InputWithHookForm } from '../../components/Form/InputWithHookForm'

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

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const { control, handleSubmit, formState: { errors } } = useForm({
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

  function handleRegister(form: FormData) {
    if (!transactionTypeSelected) return Alert.alert('Atenção', 'Você tem que selecionar um tipo de transação')
    if (category.key === 'category') return Alert.alert('Atenção', 'Você tem que selecionar uma categoria')

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType: transactionTypeSelected,
      category: category.key
    }
    console.log(data)

  }

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
          />
          <InputWithHookForm
            name='amount'
            control={control}
            placeholder='Preço'
            keyboardType='numeric'
            errorMessage={errors.amount && errors.amount?.message}
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