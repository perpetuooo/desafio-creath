import { useNavigate } from "react-router-dom"; 
import logoWhite from '../../assets/whiteLogo.svg';
import { Clock, CalendarRange } from 'lucide-react';
import { Navbar } from '../../navbar/navbar';

export function HomePage() {
    const navigate = useNavigate(); 

    return (
        <div className="flex flex-col min-h-screen pb-16">
            <div className="flex flex-col flex-grow items-center justify-evenly">
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
                            onClick={() => navigate('/agendamentos')} title="Clique para ver os seus agendamentos">
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
