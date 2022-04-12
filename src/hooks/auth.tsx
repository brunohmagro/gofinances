import React, { createContext, ReactNode, useContext, useState } from "react";
import * as Google from "expo-google-app-auth";
import * as AppleAuthentication from "expo-apple-authentication";
import Storage from "@react-native-async-storage/async-storage";

import { IOS_CLIENT_ID, ANDROID_CLIENT_ID, USER_KEY } from "@env";
import { useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  userLoading: boolean;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [userLoading, setUserLoading] = useState(true);

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const userLogged = {
          id: String(result.user.id),
          email: String(result.user.email),
          name: String(result.user.name),
          photo: result.user.photoUrl,
        };

        setUser(userLogged);
        await Storage.setItem(USER_KEY, JSON.stringify(userLogged));
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setUserLoading(false);
    }
  };

  const signInWithApple = async (): Promise<void> => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: String(credential.email),
          name: String(
            credential.fullName?.givenName +
              " " +
              credential.fullName?.familyName
          ),
          photo: `https://ui-avatars.com/api/?name=${credential.fullName?.givenName}&lenght=1`,
        };

        setUser(userLogged);
        await Storage.setItem(USER_KEY, JSON.stringify(userLogged));
        setUserLoading(false);
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    const loadUserStorage = async (): Promise<void> => {
      const userStorage = await Storage.getItem(USER_KEY);

      if (userStorage) {
        const userLogged = JSON.parse(userStorage) as User;
        setUser(userLogged);
      }

      setUserLoading(false);
    };

    loadUserStorage();
  }, []);

  const signOut = async (): Promise<void> => {
    setUser({} as User);

    await Storage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signInWithApple, signOut, userLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
