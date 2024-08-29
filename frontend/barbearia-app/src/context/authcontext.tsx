import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/axios';
import Cookies from 'js-cookie';

interface AuthContextProps {
  isLoggedIn: boolean;
  user: { phone: string } | null;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ phone: string } | null>(null);
  const checkAuth = async () => {
    try {
      const token = Cookies.get('access_token');
      console.log(token);
      if (token) {
        const response = await api.get('/api/user/getUser');
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUser(response.data[0]);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const login = async (phone: string, password: string) => {
    try {
      const response = await api.post('/api/user/register-or-login', { phone, password });
      console.log('Login response:', response.data);
      if (response.status === 200) {
        const token = response.data.accessToken;
        console.log("token front login " + token);
        Cookies.set('access_token', token, { expires: 7 });
        setIsLoggedIn(true);
        setUser({ phone });
      }
    } catch (error) {
      console.error('Erro ao logar:', error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await api.delete('/api/user/logout');
      Cookies.remove('access_token');
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
