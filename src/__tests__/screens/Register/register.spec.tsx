import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { render, waitFor, fireEvent } from '@testing-library/react-native'

import theme from '../../../global/styles/theme'
import { AuthProvider } from '../../../hooks/auth'
import { Register } from '../../../screens/Register'

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    })
  }
})

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    setItem: jest.fn(),
    getItem: jest.fn().mockResolvedValueOnce(JSON.stringify({
      id: '123-123-123',
      name: 'Any Name',
      email: 'any@mail.com',
      photo: 'https://phono.com',
    })),
    removeItem: jest.fn(),
  }
})

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      { children }
    </AuthProvider>
  </ThemeProvider>
)

describe('Register screen', () => {
  it('should be open category modal when user click on the category button', async () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers,
      }
    )

    const categoryModal = getByTestId('modal-register-category')
    const buttonCategory = getByTestId('button-register-category')

    fireEvent.press(buttonCategory)

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy()
    })
  })

  it('should be set as active after click on up type', async () => {
    const { debug, getByTestId } = render(
      <Register />,
      {
        wrapper: Providers,
      }
    )

    const TransactionTypeButtonUp = getByTestId('Register-TransactionTypeButton-up')
    const TransactionTypeButtonDown = getByTestId('Register-TransactionTypeButton-down')
    fireEvent.press(TransactionTypeButtonUp)

    await waitFor(() => {
      expect(TransactionTypeButtonUp.props.isActive).toBeTruthy()
      expect(TransactionTypeButtonDown.props.isActive).toBeFalsy()
    })
  })

  it('should be set as active after click on down type', async () => {
    const { debug, getByTestId } = render(
      <Register />,
      {
        wrapper: Providers,
      }
    )

    const TransactionTypeButtonUp = getByTestId('Register-TransactionTypeButton-up')
    const TransactionTypeButtonDown = getByTestId('Register-TransactionTypeButton-down')
    fireEvent.press(TransactionTypeButtonDown)

    await waitFor(() => {
      expect(TransactionTypeButtonDown.props.isActive).toBeTruthy()
      expect(TransactionTypeButtonUp.props.isActive).toBeFalsy()
    })
  })
})
