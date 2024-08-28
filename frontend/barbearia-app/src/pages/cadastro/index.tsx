import {  useState } from 'react';
import { useAuth } from '../../context/authcontext';
import logoWhite from '../../assets/whiteLogo.svg';
import { Navbar } from '../../components/navbar/navbar';
import { SelectCountry } from '../../components/forms/select-country';
import googleIcon from '../../assets/googleIcon.svg';
import { useNavigate } from 'react-router-dom';
//import Cookies from 'js-cookie';
export function Cadastro() {
  const [phone, setPhone] = useState('');
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   const token = Cookies.get('acess_token');
  //   if (token) {
  //     console.log('Token exists, navigating away from /cadastro');
  //     navigate('/');
  //   }
  // }, [navigate]);
  
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await login(phone, '123456');
      console.log('Login bem-sucedido');
  
      // Adicione uma verificação explícita aqui
      if (isLoggedIn) {
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao registrar ou fazer login:', error);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0 defaultFontStyles">
      <div className="flex flex-col flex-grow items-center justify-center space-y-5 px-6">
        <div className="flex justify-center items-center">
          <img src={logoWhite} alt="Logo" title="Logomarca" />
        </div>
        <div className="text-center text-customBlack font-bold md:text-base">
          Fazer login ou cadastrar-se
        </div>
        <div className="flex flex-col gap-4 w-full max-w-md px-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <SelectCountry />
            </div>
            <input
              type="text"
              placeholder="Celular"
              className="flex-1 p-2 border border-customGray-300 text-customBlack"
              value={phone}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="w-full py-2 border border-blue-500 text-blue-500 bg-transparent rounded-md hover:bg-blue-700 hover:text-zinc-50 transition-colors"
            onClick={handleSubmit}
          >
            RECEBER CÓDIGO VIA SMS
          </button>
          <button
            className="w-full py-2 border border-blue-500 text-blue-500 bg-transparent rounded-md hover:bg-blue-700 hover:text-zinc-50 transition-colors"
          >
            RECEBER CÓDIGO WHATSAPP
          </button>
        </div>
        <div className="flex items-center w-full max-w-md">
          <div className="w-1/2 border-t border-customGray-300 my-4"></div>
          <span className="text-customGray-400 mx-4">OU</span>
          <div className="w-1/2 border-t border-customGray-300 my-4"></div>
        </div>
        <button
          className="flex items-center justify-center w-full max-w-md py-2 border border-customBlack text-customBlack bg-transparent rounded-md hover:bg-customGray-100 transition-colors"
          onClick={() => console.log('Entrar com Google')}
        >
          <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
          Entre com a sua conta Google
        </button>
      </div>
      <Navbar />
    </div>
  );
}
