import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    if (auth) await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin: !!user, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
