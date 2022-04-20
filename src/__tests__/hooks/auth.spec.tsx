import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { mocked } from 'jest-mock'
import { logInAsync } from 'expo-google-app-auth'
import { signInAsync } from "expo-apple-authentication";
import Storage from "@react-native-async-storage/async-storage";
 
import { AuthProvider, useAuth } from '../../hooks/auth'
import { waitFor } from '@testing-library/react-native';

jest.mock('expo-google-app-auth')
jest.mock('expo-apple-authentication')

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
  <AuthProvider>
    { children }
  </AuthProvider>
)

describe('Auth Hook', () => {
  describe('Google tests', () => {
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
  
    it('should be error with incorrectly Google parameters', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: Providers
      })
      try {
        await act(() => result.current.signInWithGoogle())
      } catch {
        expect(result.current.user).toEqual({})
      }
    })
  })

  describe('Apple tests', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should login after apple credentials', async () => {
      const user = {
        user: 'user',
        email: 'user@mail.com',
        fullName: {
          givenName: 'First',
          familyName: 'Last'
        }
      }
      const appleMocked = mocked(signInAsync as any)
      appleMocked.mockReturnValueOnce(user)

      const { result } = renderHook(() => useAuth(), {
        wrapper: Providers
      })

      await act(() => result.current.signInWithApple())

      expect(result.current.user.email).toEqual(user.email)
      expect(Storage.setItem).toBeCalled()
      expect(result.current.userLoading).toBeFalsy()
    })

    it('should not log in after error', async () => {
      const appleMocked = mocked(signInAsync as any)
      appleMocked.mockRejectedValueOnce(new Error('any error'))

      const { result } = renderHook(() => useAuth(), {
        wrapper: Providers
      })

      try {
        await act(() => result.current.signInWithApple())
      } catch (error) {
        expect(result.current.user.email).toBeUndefined()
        expect(Storage.setItem).not.toBeCalled()
        expect(result.current.userLoading).toBeFalsy()
      }
    })
  })

  describe('Provider tests', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const user = {
      user: 'user',
      email: 'user@mail.com',
      fullName: {
        givenName: 'First',
        familyName: 'Last'
      }
    }

    it('should set user when userStorage not contains data', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: Providers
      })

      await waitFor(() => {
        expect(Storage.getItem).toBeCalled()
        expect(result.current.user).toEqual({})
        expect(result.current.userLoading).toBeFalsy()
      })
    })

    it('should log out user when prompted', async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: Providers
      })

      await act(() => result.current.signOut())

      expect(result.current.user).toEqual({})
      expect(Storage.removeItem).toBeCalled()
    })
  })
})
