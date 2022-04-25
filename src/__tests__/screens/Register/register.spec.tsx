import React from 'react'
import { Alert } from 'react-native';
import Storage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from 'styled-components/native'
import { render, waitFor, fireEvent } from '@testing-library/react-native'

import theme from '../../../global/styles/theme'
import { AuthProvider } from '../../../hooks/auth'
import { Register } from '../../../screens/Register'

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate,
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    const { getByTestId } = render(
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
    const { getByTestId } = render(
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

  it('should close the modal when clicking the select button', async () => {
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
      const close = getByTestId('CategorySelect-Button-CloseSelectCategory')
      fireEvent.press(close)

      expect(categoryModal.props.visible).toBeFalsy()
    })
  })

  it('should show error alert when not select transaction type', async () => {
    jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers,
      }
    )

    const TransactionTypeButtonUp = getByTestId('Register-TransactionTypeButton-up')
    const TransactionTypeButtonDown = getByTestId('Register-TransactionTypeButton-down')

    const name = getByTestId('Register-InputForm-name')
    const amount = getByTestId('Register-InputForm-amount')

    fireEvent.changeText(name, 'Any_name')
    fireEvent.changeText(amount, '10')

    const submitButton = getByTestId('Register-submit-button')
    fireEvent.press(submitButton)
    
    await waitFor(() => {
      expect(TransactionTypeButtonDown.props.isActive).toBeFalsy()
      expect(TransactionTypeButtonUp.props.isActive).toBeFalsy()

      expect(Alert.alert).toBeCalledWith('Selecione o tipo da transação')
    })
  })

  it('should show error alert when not selecting transaction category', async () => {
    jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers,
      }
    )

    const TransactionTypeButtonUp = getByTestId('Register-TransactionTypeButton-up')
    const TransactionTypeButtonDown = getByTestId('Register-TransactionTypeButton-down')

    const name = getByTestId('Register-InputForm-name')
    const amount = getByTestId('Register-InputForm-amount')

    fireEvent.changeText(name, 'Any_name')
    fireEvent.changeText(amount, '10')
    fireEvent.press(TransactionTypeButtonUp)

    const submitButton = getByTestId('Register-submit-button')
    fireEvent.press(submitButton)
    
    await waitFor(() => {
      expect(TransactionTypeButtonDown.props.isActive).toBeFalsy()
      expect(TransactionTypeButtonUp.props.isActive).toBeTruthy()

      expect(Alert.alert).toBeCalledWith('Selecione uma categoria')
    })
  })

  it('should register an entry', async () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers,
      }
    )

    const TransactionTypeButtonDown = getByTestId('Register-TransactionTypeButton-down')

    const name = getByTestId('Register-InputForm-name')
    const amount = getByTestId('Register-InputForm-amount')

    fireEvent.changeText(name, 'Any_name')
    fireEvent.changeText(amount, '10')
    fireEvent.press(TransactionTypeButtonDown)

    const category = getByTestId('modal-register-category')
    fireEvent.press(category)  
    
    await waitFor(() => {
      const categoryToSelect = getByTestId('CategorySelect-button-item-food')
      fireEvent.press(categoryToSelect)
      const closeModal = getByTestId('CategorySelect-Button-CloseSelectCategory')
      fireEvent.press(closeModal)

      const submitButton = getByTestId('Register-submit-button')
      fireEvent.press(submitButton)

      expect(mockedNavigate).toBeCalledWith('Listagem')
    })
  })

  it('wip', async () => {
    jest.spyOn(Alert, 'alert');
    jest.spyOn(Storage, 'setItem').mockRejectedValueOnce(new Error('any error'))

    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers,
      }
    )

    const TransactionTypeButtonDown = getByTestId('Register-TransactionTypeButton-down')

    const name = getByTestId('Register-InputForm-name')
    const amount = getByTestId('Register-InputForm-amount')

    fireEvent.changeText(name, 'Any_name')
    fireEvent.changeText(amount, '10')
    fireEvent.press(TransactionTypeButtonDown)

    const category = getByTestId('modal-register-category')
    fireEvent.press(category)  
    
    await waitFor(() => {
      const categoryToSelect = getByTestId('CategorySelect-button-item-food')
      fireEvent.press(categoryToSelect)
      const closeModal = getByTestId('CategorySelect-Button-CloseSelectCategory')
      fireEvent.press(closeModal)

      const submitButton = getByTestId('Register-submit-button')
      fireEvent.press(submitButton)

      expect(Alert.alert).toBeCalledWith('Não foi possivel salvar')
      expect(mockedNavigate).not.toBeCalledWith('Listagem')
    })
  })
})
