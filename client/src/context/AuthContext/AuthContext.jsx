import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getMe, login as loginRequest } from '../../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('portfolio_token');
    if (!token) {
      setLoading(false);
      return;
    }
    getMe()
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem('portfolio_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await loginRequest({ email, password });
    localStorage.setItem('portfolio_token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('portfolio_token');
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, logout, isAuthenticated: !!user }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
