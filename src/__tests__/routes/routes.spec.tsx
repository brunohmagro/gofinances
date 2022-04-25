import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { render, waitFor } from '@testing-library/react-native'

import theme from '../../global/styles/theme'

import { Routes } from '../../routes'
import { AuthProvider } from '../../hooks/auth'

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

describe('Routes tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render signin container', () => {
    const { getByTestId } = render(
      <Routes />,
      {
        wrapper: Providers,
      }
    )
    
    waitFor(() => {
      const signin = getByTestId('SignIn-Container')
      expect(signin).toBeTruthy()
    })
  })
})