import { useNavigate } from "react-router-dom"; 
import logoWhite from '../../assets/whiteLogo.svg';
import { Clock, CalendarRange } from 'lucide-react';
import { Navbar } from '../../components/navbar/navbar';
import { useAuth } from '../../context/authcontext'; 
import { useEffect } from "react";
import { useAgendar } from "../../context/agendarContext";

export function HomePage() {
    const {checkAuth, isLoggedIn} = useAuth();
    const navigate = useNavigate(); 
    const {agendamentos, setAgendamentos} = useAgendar();
    useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
    };

    verifyAuth();
  }, [checkAuth]);

  const handleMeusAgendamentos = ()=>{
    if(agendamentos.length > 0 && !isLoggedIn){
        setAgendamentos([])    
        navigate('/pedido')
    }
    else
        navigate('/agendamentos')

  }

    
    return (
        <div className="flex flex-col min-h-screen pb-16 md:pb-0">
            <div className="flex flex-col flex-grow items-center justify-center space-y-12">
                <div className="flex justify-center items-center">
                    <img src={logoWhite} alt="Logo" title="Logomarca"/>
                </div>
                <div className="defaultFontStyles">
                    <div className="flex justify-around items-center gap-5 text-zinc-50">
                        <button 
                            className='flex flex-col items-center justify-center bg-customGray-400 w-36 h-24 rounded-xl shadow-homePrimaryButton gap-1 md:hover:bg-customGray-100 ease-in-out duration-300 md:hover:text-customBlack'
                            onClick={() => navigate('/agendar')} title="Clique para Agendar" >
                            <Clock className='size-5' />
                            <span>Novo Agendamento</span>
                        </button>
                        <button 
                            className='bg-customBlack flex flex-col items-center justify-center w-36 h-24 rounded-xl shadow-homePrimaryButton gap-1 md:hover:bg-customGray-100 ease-in-out duration-300 md:hover:text-customBlack'
                            onClick={() => handleMeusAgendamentos() } title="Clique para ver os seus agendamentos">
                            <CalendarRange className='size-5' />
                            <span>Meus Agendamentos</span>      
                        </button>
                    </div>
                </div>
            </div>
            <Navbar />

        </div>
    );
}
