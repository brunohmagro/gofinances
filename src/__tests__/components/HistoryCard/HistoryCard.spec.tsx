import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { render, fireEvent } from '@testing-library/react-native'

import theme from '../../../global/styles/theme'

import { HistoryCard } from '../../../components/HistoryCard'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
      { children }
  </ThemeProvider>
)

describe('HistoryCard component', () => {
  it('should renden HistoryCard component', () => {
    const { getByTestId, getByText } = render(
      <HistoryCard title='any_title' amount='10' color='#ccc'  />,
      {
        wrapper: Providers,
      }
    )

    const container = getByTestId('HistoryCard-Container')
    const title = getByText('any_title')
    const amount = getByText('10')
    
    expect(container.props.color).toEqual('#ccc')
    expect(title).toBeTruthy()
    expect(amount).toBeTruthy()
  })
})