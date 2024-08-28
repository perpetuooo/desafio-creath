import { createContext, useContext, useEffect, useState } from 'react';
import { api, setAxiosHeadersToken } from '../lib/axios';
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
      const token = Cookies.get('acess_token');
      if (token) {
        const response = await api.get('/api/user/phone', {
          headers: { Authorization: `Bearer ${token}` } //precisa mudar porque o get não pede autorização mas deveria
        });
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
        const token = response.data.acessToken;
        Cookies.set('acess_token', token, { expires: 7 });
        setIsLoggedIn(true);
        setUser({ phone });
        setAxiosHeadersToken(token);
      }
    } catch (error) {
      console.error('Erro ao logar:', error);
      setIsLoggedIn(false);
      setUser(null);
    }
    
  };

  const logout = async () => {
    try {
      const token = Cookies.get('acess_token');
      console.log(token)
      if (!token) throw new Error('No token found');
      
      await api.delete('/api/user/logout', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      Cookies.remove('acess_token');
      setIsLoggedIn(false);
      setAxiosHeadersToken('');
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
