import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface User {
  id: string;
  name?: string;
  phone: string;
  email?: string;
  birthDate?: string; 
}

interface AuthContextProps {
  isLoggedIn: boolean;
  user: User | null;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  loading: boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    if (!loading) return;  // Impede que a função seja chamada se `loading` for falso

    try {
      const response = await api.get('/api/user/getUser');
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUser(response.data);  // Define o estado do usuário ao receber a resposta
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch {
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);  // Define `loading` como falso ao final da requisição
    }
  };

  const login = async (phone: string, password: string) => {
    try {
      const response = await api.post('/api/user/register-or-login', { phone, password });
      if (response.status === 200) {
        setIsLoggedIn(true);
        const userData = await api.get('/api/user/getUser');
        setUser(userData.data);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await api.delete('/api/user/logout');
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  useEffect(() => {
    checkAuth();  // Chama `checkAuth` ao montar o componente
  }, []);  // Passa uma lista de dependências vazia para chamar a função apenas uma vez

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading ,login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
