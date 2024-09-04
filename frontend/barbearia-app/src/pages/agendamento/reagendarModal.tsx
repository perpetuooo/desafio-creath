import { X, ConciergeBellIcon, UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Schedules } from './index';
import { useAgendar } from '../../context/agendarContext';


interface ReagendarModalProps {
    closeModal: () => void;
    schedule: Schedules; 
}

export function ReagendarModal({ closeModal, schedule }: ReagendarModalProps) {
    const navigate = useNavigate(); 
    const { setSelectedService, setSelectedBarber } = useAgendar();
    const handleAgendar = async () => {
        setSelectedBarber({id: schedule.barberId , name: schedule.barberName, phone: ""})
        setSelectedService({title: schedule.service ,duration: "", value: schedule.serviceValue})
        closeModal();
        navigate('/resumo')
    };

    const handleNaoquer = async () =>{
        closeModal();
        window.location.reload();
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-72 bg-white rounded-xl shadow-navbar">
                <div className="flex justify-between items-center bg-customGray-400 rounded-t-lg py-3 px-3">
                    <span className="text-base md:font-bold text-customGray-100">Reagendar</span>
                    <X 
                        className="text-customGray-300 cursor-pointer hover:text-customGray-100" 
                        onClick={handleNaoquer}
                    />
                </div>
                <div className="flex flex-col py-7 px-5">
                    <h2 className="text-left text-customBlack mt-1 font-bold text-sm">
                        Deseja agendar para outro horário?
                    </h2>
                    
                    <div className="flex flex-col gap-4 mt-2 ml-2">
                        <h3 className="text-left text-customGray-400 mt-4 font-bold">
                            Agendamento: 
                        </h3>
                        <div className="flex items-center gap-4">
                            <ConciergeBellIcon className="size-5 font-bold" />
                            <span className="text-customGray-300">{schedule.service}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <UserIcon className="size-5 font-black" />
                            <span className="text-customGray-300">{schedule.barberName }</span>
                        </div>
                    </div>

                    <div className="flex justify-end mt-8">
                        <button
                            className="transform hover:translate-y-[-5px] ease-in-out duration-300 px-4 py-2 rounded-md text-customBlack"
                            onClick={handleNaoquer}
                        >
                            Não quero 
                        </button>
                        <button
                             className="transform hover:translate-y-[-5px] ease-in-out duration-300 px-4 py-2 rounded-md text-green-500 w-24"
                            onClick={handleAgendar}
                        >
                            Agendar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
