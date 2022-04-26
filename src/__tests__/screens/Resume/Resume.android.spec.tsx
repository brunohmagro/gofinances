import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { render, waitFor } from '@testing-library/react-native'

import theme from '../../../global/styles/theme'
import { AuthProvider } from '../../../hooks/auth'
import { Resume } from '../../../screens/Resume'

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'android',
  select: () => null,
}));

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

  it('should render the Resume screen in android', async () => {
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
})
