import React from 'react'
import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile'

describe('Profile', () => {
  it('should show username input placeholder correctly', () => {
    const { getByPlaceholderText } = render(<Profile />)
    
    const inputName = getByPlaceholderText('Nome')
  
    expect(inputName).toBeTruthy()
  })
  
  it('should be load user data', () => {
    const { getByTestId } = render(<Profile />)
  
    const inputName = getByTestId('input-name')
    const inputSurname = getByTestId('input-surname')
  
    expect(inputName.props.value).toEqual('Bruno')
    expect(inputSurname.props.value).toEqual('Magro')
  })
  
  it('should exist title correctly', () => {
    const { getByTestId } = render(<Profile />)
  
    const title = getByTestId('text-title')
  
    expect(title.props.children).toContain('Perfil')
  })
})
