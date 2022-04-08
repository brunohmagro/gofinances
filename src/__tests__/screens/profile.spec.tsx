import React from 'react'
import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile'

test('should show username button placeholder correctly', () => {
  const { getByPlaceholderText } = render(<Profile />)
  
  const inputName = getByPlaceholderText('Nome')

  expect(inputName).toBeTruthy()
})

test('checks if user data has been loaded', () => {
  const { getByTestId } = render(<Profile />)

  const inputName = getByTestId('input-name')
  const inputSurname = getByTestId('input-surname')

  expect(inputName.props.value).toEqual('Bruno')
  expect(inputSurname.props.value).toEqual('Magro')
})

test('checks if title render correctly', () => {
  const { getByTestId } = render(<Profile />)

  const title = getByTestId('text-title')

  expect(title.props.children).toContain('Perfil')
})