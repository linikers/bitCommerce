'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import usersData from '../data/users.json'

interface User {
  id: number
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
  register: (email: string, password: string, name: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState(usersData)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (email: string, password: string) => {
    const foundUser = users.find(u => u.email === email && u.password === password)
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const register = (email: string, password: string, name: string) => {
    if (users.some(u => u.email === email)) {
      return false // Email já existe
    }
    
    const newUser = {
      id: users.length + 1,
      email,
      password,
      name
    }
    
    setUsers([...users, newUser])
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
