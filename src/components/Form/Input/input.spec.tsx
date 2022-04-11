import React from 'react'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

import theme from '../../../global/styles/theme'
import { Input } from '.'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
)

describe('Input Component', () => {
  it('must have specif border color when active is true', () => {
    const componentId = 'input-email'

    const { getByTestId } = render(
      <Input
        testID={componentId}
        placeholder='E-mail'
        keyboardType='email-address'
        autoCorrect={false}
        active={true}
      />,
      {
        wrapper: Providers,
      }
    )

    const inputComponent = getByTestId(componentId)

    expect(inputComponent.props.style[0].borderColor).toEqual(theme.colors.attention)
    expect(inputComponent.props.style[0].borderWidth).toEqual(RFValue(3))
  })
})