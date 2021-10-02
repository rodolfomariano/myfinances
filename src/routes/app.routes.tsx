import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'
import { Platform } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

import { ListingTransactions } from '../screens/ListingTransactions'
import { Register } from '../screens/Register'
import { Historic } from '../screens/Historic'
import { ButtonNewTransaction } from '../components/ButtonNewTransaction/intex'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.attention,
        tabBarInactiveTintColor: theme.colors.text,
        // tabBarShowLabel: false,
        // tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 17,
          paddingBottom: 15,
          height: 70,
          backgroundColor: theme.colors.shape_dark,
          borderTopWidth: 0
        }
      }}
    >
      <Screen
        name="Transações"
        component={ListingTransactions}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons name='format-list-bulleted' size={size} color={color} />
          ))
        }}
      />
      <Screen
        name="Novo"
        component={Register}
        options={{
          tabBarLabel: '',
          tabBarIcon: (({ size, color }) => (
            <ButtonNewTransaction color={color} />
          ))
        }}
      />
      <Screen
        name="Histórico"
        component={Historic}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons name='pie-chart' size={size} color={color} />
          ))
        }}
      />
    </Navigator>
  )
}