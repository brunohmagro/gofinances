import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { render } from '@testing-library/react-native'

import theme from '../../../global/styles/theme'
import GoogleSvg from '../../../assets/icons/google.svg';

import { SignInSocialButton } from '../../../components/SignInSocialButton'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
      { children }
  </ThemeProvider>
)

describe('SignInSocialButton component', () => {
  it('should renden SignInSocialButton component', () => {
    const { getByTestId, getByText } = render(
      <SignInSocialButton title="any_title" svg={GoogleSvg} />,
      {
        wrapper: Providers,
      }
    )

    const title = getByText('any_title')

    expect(title).toBeTruthy()
  })
})