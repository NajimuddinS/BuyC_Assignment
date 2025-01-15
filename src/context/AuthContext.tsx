import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

// Mock users for testing
const MOCK_USERS = {
  dealer: {
    id: '1',
    email: 'dealer@example.com',
    name: 'John Dealer',
    role: 'dealer' as const,
    password: 'dealer123'
  },
  buyer: {
    id: '2', 
    email: 'buyer@example.com',
    name: 'Jane Buyer',
    role: 'buyer' as const,
    password: 'buyer123'
  }
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string, role: 'dealer' | 'buyer') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock authentication
    const mockUser = Object.values(MOCK_USERS).find(
      u => u.email === email && u.password === password
    );

    if (!mockUser) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = mockUser;
    setUser(userWithoutPassword);
  };

  const signup = async (email: string, password: string, name: string, role: 'dealer' | 'buyer') => {
    // Mock signup - in a real app, this would create a new user
    setUser({ id: Math.random().toString(), email, name, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}