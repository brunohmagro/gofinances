import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { fireEvent, render, waitFor } from '@testing-library/react-native'

import theme from '../../../global/styles/theme'
import { AuthProvider } from '../../../hooks/auth'
import { SignIn } from '../../../screens/SignIn'

jest.mock('styled-components', () => {
  return {
    useTheme: jest.fn().mockReturnValue({
      colors: {
        shape: '#fff'
      }
    })
  }
})

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useIsFocused: () => true,
  }
})

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    setItem: jest.fn(),
    getItem: jest.fn(),
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

describe('SignIn screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the SignIn screen', async () => {
    const { getByTestId, getByText } = render(
      <SignIn />,
      {
        wrapper: Providers,
      }
    )
    const container = getByTestId('SignIn-Container')
    const loginGoogleBtn = getByText('Entrar com o Google')

    waitFor(() => {
      expect(container).toBeTruthy()
      expect(loginGoogleBtn).toBeTruthy()
    })    
  })

  it('should call handleSignInWithGoogle after click', async () => {
    const { getByTestId, getByText } = render(
      <SignIn />,
      {
        wrapper: Providers,
      }
    )
    const loginGoogleBtn = getByText('Entrar com o Google')
    fireEvent.press(loginGoogleBtn)

    waitFor(() => {
      const indicator = getByTestId('SignIn-Container-ActivityIndicator')
      expect(indicator).toBeTruthy()
    })    
  })

  it('should call handleSignInWithApple after click', async () => {
    const { getByTestId, getByText } = render(
      <SignIn />,
      {
        wrapper: Providers,
      }
    )
    const loginAppleBtn = getByText('Entrar com Apple')
    fireEvent.press(loginAppleBtn)

    waitFor(() => {
      const indicator = getByTestId('SignIn-Container-ActivityIndicator')
      expect(indicator).toBeTruthy()
    })    
  })
})
