import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { render } from '@testing-library/react-native'

import theme from '../../../global/styles/theme'

import { TransactionsCard, DataTransaction } from '../../../components/TransactionCard'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
      { children }
  </ThemeProvider>
)

describe('TransactionCard component', () => {
  it('should renden TransactionCard component with type negative', () => {
    const transaction = {
      title: 'any_title_negative',
      amount:'10',
      amountFormatted: 'R$ 10,00',
      dateFormatted: '10/10/2022',
      category: {
        name: 'Compras',
        icon: 'shopping-bag',
        key: 'purchases',
      },
      date: '10/10/2022',
      type: "negative",
    } as DataTransaction
  
    const { getByText } = render(
      <TransactionsCard data={transaction} />,
      {
        wrapper: Providers,
      }
    )

    const title = getByText('any_title_negative')
    const amountNegative = getByText("- " + transaction.amountFormatted)

    expect(title).toBeTruthy()
    expect(amountNegative).toBeTruthy()
  })

  it('should renden TransactionCard component with type positive', () => {
    const transaction = {
      title: 'any_title_positive',
      amount:'10',
      amountFormatted: 'R$ 10,00',
      dateFormatted: '10/10/2022',
      category: {
        name: 'Compras',
        icon: 'shopping-bag',
        key: 'purchases',
      },
      date: '10/10/2022',
      type: 'positive',
    } as DataTransaction
  
    const { getByText } = render(
      <TransactionsCard data={transaction} />,
      {
        wrapper: Providers,
      }
    )

    const title = getByText('any_title_positive')
    const amountPositive = getByText(transaction.amountFormatted)

    expect(title).toBeTruthy()
    expect(amountPositive).toBeTruthy()
  })
})