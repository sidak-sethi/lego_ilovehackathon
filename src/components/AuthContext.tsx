'use client'

import React, { createContext, useState, useContext } from 'react'

type User = {
  username: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = async (username: string, password: string) => {
    // In a real app, you'd validate credentials with your backend
    setUser({ username, email: `${username}@example.com` })
  }

  const signup = async (username: string, email: string, password: string) => {
    // In a real app, you'd send this data to your backend
    setUser({ username, email })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

