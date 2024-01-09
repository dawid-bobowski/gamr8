import { createContext, FC, ReactNode, useState } from 'react';

import { Review } from '../common/types';

interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl: string;
  reviews: Review[];
}

export interface AuthContextType {
  currentUser: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  }

  const updateUser = (user: User) => {
    const newUser: User = {
      ...currentUser,
      ...user,
    }

    localStorage.setItem('user', JSON.stringify(newUser));
    setCurrentUser(newUser);
  }

  return <AuthContext.Provider
    value={{
      currentUser,
      login,
      logout,
      updateUser,
    }}
  >{children}</AuthContext.Provider>;
};
