import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
 
import { AuthProvider, useAuth } from '../../hooks/auth'

jest.mock('expo-google-app-auth', () => {
  return {
    logInAsync: () => {
      return {
        type: 'success',
        user: {
          id: '123-123-123',
          email: 'any@mail.com',
          name: 'AnyName',
          photo: 'any_photo.png'
        }
      }
    }
  }
})

const Providers: React.FC = ({ children }) => (
  <AuthProvider>
    { children }
  </AuthProvider>
)

describe('Auth Hook', () => {
  it('should be able to sign with Google account existing', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: Providers
    })

    await act(() => result.current.signInWithGoogle())

    expect(result.current.user.email).toBe('any@mail.com')
  })
})
