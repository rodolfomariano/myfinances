import React, { useState } from 'react'
import { FlatList } from 'react-native'

import { CategoryItem } from '../../../screens/CategoryToSelect/styles'

import { categories } from '../../../utils/categories'

import {
  Container,
  Header,
  Category,
  Icon,
  Content,
  TypeIcon,
  Name,
  Separator
} from './styles'

interface CategoryProps {
  key: string
  name: string
}

interface ButtonSelectCategoryProps {
  category: CategoryProps
  setCategory: (category: CategoryProps) => void
}

export function ButtonSelectCategory({ category, setCategory }: ButtonSelectCategoryProps) {
  const [isCategoryOptionsVisible, setIsCategoryOptionsVisible] = useState(false)
  const [option, setOption] = useState(category.name)

  function handleSelectOption(categorySelected: CategoryProps) {
    setOption(categorySelected.name)
    setCategory(categorySelected)
    setIsCategoryOptionsVisible(!isCategoryOptionsVisible)
  }

  return (
    <Container>
      <Header onPress={() => setIsCategoryOptionsVisible(!isCategoryOptionsVisible)}>
        <Category>{option}</Category>
        <Icon name='chevron-down' />
      </Header>

      <Content>
        <FlatList
          data={categories}
          style={{
            paddingHorizontal: 8,
            height: 200,
            display: (isCategoryOptionsVisible === false ? 'none' : 'flex')
          }}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <CategoryItem
              onPress={() => handleSelectOption({
                key: item.key,
                name: item.name
              })}
            >
              <TypeIcon name={item.icon} />
              <Name>{item.name}</Name>
            </CategoryItem>
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
      </Content>
    </Container>
  )
}
