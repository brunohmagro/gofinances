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

  it('teste', async () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers,
      }
    )

    const TransactionTypeButton = getByTestId('Register-TransactionTypeButton-up')
    fireEvent.press(TransactionTypeButton)

    await waitFor(() => {
      // console.log(TransactionTypeButton.props.isActive)
      expect(TransactionTypeButton.props.isActive).toBeTruthy()
    })
  })
})
