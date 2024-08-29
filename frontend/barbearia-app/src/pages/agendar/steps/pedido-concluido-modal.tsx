import { BadgeCheck, X, CalendarClockIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PedidoConcluidoModalProps {
    closeModalPedidoConcluido: () => void; 
}

export function PedidoConcluidoModal(props: PedidoConcluidoModalProps) {
    const navigate = useNavigate(); 

    const handleClose = () => {
        props.closeModalPedidoConcluido()
        navigate('/agendamentos'); 
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-80 bg-white rounded-xl shadow-lg">
                <div className="w-full bg-customGray-400 rounded-t-lg flex justify-between items-center mb-4 py-3 px-3">
                    <span className="text-lg font-bold text-customGray-100">Concluído</span>
                    <X 
                        className="text-customGray-300 cursor-pointer hover:text-customGray-100" 
                        onClick={props.closeModalPedidoConcluido} 
                    />
                </div>

                <div className="flex flex-col items-center gap-4 py-3 px-3">
                    <BadgeCheck className="text-green-500 size-24" />
                    <span className="font-bold text-customBlack text-center">
                        Agendamento realizado
                    </span>
                    <a href='https://calendar.google.com/calendar/u/0/r' target='blank' className="text-customGray-400 hover:underline flex items-center gap-2 font-bold">
                        <CalendarClockIcon className="size-5 text-blue-500"/>Adicionar ao Google Agenda
                    </a >
                    <button 
                        className="bg-customGray-400 transform hover:translate-y-[-5px] ease-in-out duration-300 text-customGray-100 px-4 py-2 rounded-md mt-4 hover:bg-customGray-500 w-32"
                        onClick={handleClose} 
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}
