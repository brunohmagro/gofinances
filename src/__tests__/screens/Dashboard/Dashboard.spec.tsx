import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import Storage from "@react-native-async-storage/async-storage";
import { render, waitFor } from '@testing-library/react-native'

import theme from '../../../global/styles/theme'
import { AuthProvider } from '../../../hooks/auth'
import { Dashboard } from '../../../screens/Dashboard'

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

jest.mock('styled-components', () => {
  return {
    useTheme: jest.fn().mockReturnValue({
      colors: {
        primary: '#5636D3'
      }
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

describe('Dashboard screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the dashboard', async () => {  
    jest.spyOn(Storage, 'getItem').mockResolvedValueOnce('none')

    const { getByTestId } = render(
      <Dashboard />,
      {
        wrapper: Providers,
      }
    )
        
    await waitFor(() => {
      const container = getByTestId('Dashboard-Container')
      const indicator = getByTestId('Dashboard-Container-ActivityIndicator')
    
      expect(container).toBeTruthy()
      expect(indicator).toBeTruthy()
    })
  })

  it('should render the listing', async () => {
    const transactions = [
      {
        id: '1',
        title: 'title-1',
        amount: '10',
        amountFormatted: 'R$ 10,00',
        dateFormatted: '26/04/2022',
        category: {
          name: 'Carro',
          icon: 'crosshair',
          key: 'car'
        },
        date: 'Tue Apr 26 2022 09:17:35 GMT-0300 (Horário Padrão de Brasília)',
        type: 'positive',
      },
      {
        id: '2',
        title: 'title-2',
        amount: '20',
        amountFormatted: 'R$ 20,00',
        dateFormatted: '26/04/2022',
        category: {
          name: 'Estudos',
          icon: 'book',
          key: 'studies'
        },
        date: 'Tue Apr 26 2022 09:17:35 GMT-0300 (Horário Padrão de Brasília)',
        type: 'negative',
      }
    ]

    jest.spyOn(Storage, 'getItem').mockResolvedValueOnce(JSON.stringify(transactions))

    const { getByTestId, getByText } = render(
      <Dashboard />,
      {
        wrapper: Providers,
      }
    )
        
    await waitFor(() => {
      const container = getByTestId('Dashboard-Container')
      const listagem = getByText('Listagem')
    
      expect(container).toBeTruthy()
      expect(listagem).toBeTruthy()
    })
  })
})
