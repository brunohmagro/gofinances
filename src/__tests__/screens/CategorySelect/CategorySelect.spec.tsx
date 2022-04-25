import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { render, fireEvent } from '@testing-library/react-native'

import theme from '../../../global/styles/theme'

import { CategorySelect } from '../../../screens/CategorySelect'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
      { children }
  </ThemeProvider>
)

describe('CategorySelect screen', () => {
  it('should renden CategorySelect component', () => {
    const { getByText } = render(
      <CategorySelect category={{
          key: 'purchases', name: 'Compras'
        }}
        setCategory={jest.fn()}
        closeSelectCategory={jest.fn()}
      />,
      {
        wrapper: Providers,
      }
    )

    const categoryButton = getByText('Compras')
    fireEvent.press(categoryButton)

    expect(categoryButton).toBeTruthy()
  })
})