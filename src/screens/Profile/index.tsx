import React from 'react'
import { Button, Text, TextInput, View } from 'react-native'

import { Container } from './styles'

export const Profile: React.FC = () => (
  <View>
    <Text
      testID='text-title'
    >
      Perfil
    </Text>

    <TextInput
      testID='input-name'
      placeholder='Nome'
      autoCorrect={false}
      value='Bruno'
    />

    <TextInput
      testID='input-surname'
      placeholder='Sobrenome'
      autoCorrect={false}
      value='Magro'
    />

    <Button testID='btn-profile' title='Salvar' onPress={() => {}} />
  </View>
)