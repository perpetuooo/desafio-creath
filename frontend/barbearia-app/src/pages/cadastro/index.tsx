import logoWhite from '../../assets/whiteLogo.svg';
import { Navbar } from '../../navbar/navbar';
import { SelectCountry } from '../../components/forms/select-country';
import googleIcon from '../../assets/googleIcon.svg';

export function Cadastro() {
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
            />
          </div>
          <button
            className="w-full py-2 border border-blue-500 text-blue-500 bg-transparent rounded-md hover:bg-blue-700 hover:text-zinc-50 transition-colors"
            onClick={() => console.log('Receber código via SMS')}
          >
            RECEBER CÓDIGO VIA SMS
          </button>
          <button
            className="w-full py-2 border border-blue-500 text-blue-500 bg-transparent rounded-md hover:bg-blue-700 hover:text-zinc-50 transition-colors"
            onClick={() => console.log('Receber código via WhatsApp')}
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
