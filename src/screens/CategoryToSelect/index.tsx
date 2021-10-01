import React from 'react'
import { FlatList, StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { AntDesign } from '@expo/vector-icons'

import { categories } from '../../utils/categories'

import {
  Container,
  Header,
  Title,
  FlatListContainer,
  CategoryItem,
  Icon,
  Name,
  Separator,
  CloseModalButton,
  CloseIcon
} from './styles'

interface CategoryProps {
  key: string
  name: string
}

interface CategoryToSelectProps {
  category: CategoryProps
  setCategory: (category: CategoryProps) => void
  closeSelectCategory: () => void
}

export function CategoryToSelect({
  category,
  setCategory,
  closeSelectCategory,
}: CategoryToSelectProps) {

  const theme = useTheme()

  function handleSelectCategoryAndCloseModal(category: CategoryProps) {
    setCategory(category)
    closeSelectCategory()
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Title>Categorias</Title>
        <CloseModalButton
          onPress={closeSelectCategory}
        >
          <AntDesign name='close' size={32} color={theme.colors.error_light} />
        </CloseModalButton>
      </Header>

      <FlatList
        data={categories}
        style={{ paddingHorizontal: 8 }}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <CategoryItem
            onPress={() => handleSelectCategoryAndCloseModal(item)}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </CategoryItem>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

    </Container>
  )
}