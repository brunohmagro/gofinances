import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { render, fireEvent } from '@testing-library/react-native'

import theme from '../../../global/styles/theme'

import { HighlightCard } from '../../../components/HighlightCard'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
      { children }
  </ThemeProvider>
)

describe('HighlightCard component', () => {
  it('should renden HighlightCard component', () => {
    const { getByTestId, getByText } = render(
      <HighlightCard title='any_title' amount='10' lastTransaction='last_transaction' type='up' />,
      {
        wrapper: Providers,
      }
    )

    const title = getByText('any_title')
    const amount = getByTestId('HighlightCard-Amount')
    const LastTransaction = getByText('last_transaction')

    expect(title).toBeTruthy()
    expect(amount.props.type).toEqual('up')
    expect(LastTransaction).toBeTruthy()
  })
})