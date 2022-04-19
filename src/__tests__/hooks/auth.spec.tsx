import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { mocked } from 'jest-mock'
import { logInAsync } from 'expo-google-app-auth'
 
import { AuthProvider, useAuth } from '../../hooks/auth'

jest.mock('expo-google-app-auth')

const Providers: React.FC = ({ children }) => (
  <AuthProvider>
    { children }
  </AuthProvider>
)

describe('Auth Hook', () => {
  it('should be able to sign with Google account existing', async () => {
    const googleMocked = mocked(logInAsync as any)
    googleMocked.mockReturnValueOnce({
      type: 'success',
      user: {
        id: '123-123-123',
        email: 'any@mail.com',
        name: 'AnyName',
        photo: 'any_photo.png'
      }
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: Providers
    })

    await act(() => result.current.signInWithGoogle())

    expect(result.current.user.email).toBe('any@mail.com')
  })

  it('should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(logInAsync as any)
    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: Providers
    })

    await act(() => result.current.signInWithGoogle())

    expect(result.current.user).not.toHaveProperty('id')
  })
})
