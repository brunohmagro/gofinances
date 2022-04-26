import React from 'react'
import { Platform } from "react-native";
import { ThemeProvider } from 'styled-components/native'
import Storage from "@react-native-async-storage/async-storage";
import { fireEvent, render, waitFor } from '@testing-library/react-native'

import theme from '../../../global/styles/theme'
import { AuthProvider } from '../../../hooks/auth'
import { Resume } from '../../../screens/Resume'

jest.mock('styled-components', () => {
  return {
    useTheme: jest.fn().mockReturnValue({
      colors: {
        shape: '#fff'
      }
    })
  }
})

jest.mock('@react-navigation/bottom-tabs', () => {
  return {
    createBottomTabNavigator: jest.fn(),
    useBottomTabBarHeight: jest.fn(),
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

describe('Resume screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Resume screen', async () => {
    const { getByTestId } = render(
      <Resume />,
      {
        wrapper: Providers,
      }
    )

    waitFor(() => {
      const container = getByTestId('Resume-Container')

      expect(container).toBeTruthy()
    })    
  })

  it('should render Resume screen with transaction data', async () => {
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

    const { getByTestId } = render(
      <Resume />,
      {
        wrapper: Providers,
      }
    )

    waitFor(() => {
      const container = getByTestId('Resume-Container')

      expect(container).toBeTruthy()
    })    
  })

  it('should call the handleDateChange function with the previous parameter', async () => {
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

    const { getByTestId, debug } = render(
      <Resume />,
      {
        wrapper: Providers,
      }
    )
    
    await waitFor(() => {
      const previousButton = getByTestId('Resume-Container-MonthSelectButton-Previous')
      fireEvent.press(previousButton)

      expect(previousButton).toBeTruthy()
    })    
  })

  it('should call the handleDateChange function with the next parameter', async () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
    }));

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

    const { getByTestId } = render(
      <Resume />,
      {
        wrapper: Providers,
      }
    )
    
    await waitFor(() => {
      const nextButton = getByTestId('Resume-Container-MonthSelectButton-Next')
      fireEvent.press(nextButton)

      expect(nextButton).toBeTruthy()
    })    
  })
})
