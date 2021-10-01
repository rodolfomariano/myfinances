import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import Modal from 'react-native-modal'

import { Header } from '../../components/Header'
import { Input } from '../../components/Form/Input'
import { Button } from '../../components/Form/Button'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelect } from '../../components/Form/CategorySelect'
import { CategoryToSelect } from '../CategoryToSelect'

import {
  Container,
  HeaderContainer,
  HeaderTitle,
  FormContainer,
  TransactionTypesContainer,
  Footer
} from './styles'

export function Register() {
  const [transactionTypeSelected, setTransactionTypeSelected] = useState('')
  const [isCategoryModalOpen, setIsModalCategoryOpen] = useState(false)

  const [category, setCategory] = useState({
    key: 'categorya',
    name: 'Categoria'
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

  return (
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
        <Input placeholder='Nome' />
        <Input placeholder='Preço' />

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
          <Button title='Cadastrar' />

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
  )
}