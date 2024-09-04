import { X } from 'lucide-react';
import { useState } from 'react';
import { ReagendarModal } from './reagendarModal';
import { api } from '../../lib/axios'; 
import { Schedules } from './index';
import { format } from 'date-fns/format';
import { ptBR } from 'date-fns/locale/pt-BR';

interface ConfirmarCancelarAgendamentoProps {
    closeModalAgendamento: () => void;
    confirmarAgendamento: () => void;
    agendamentoId: number | undefined; 
    schedule: Schedules;
}

export function ConfirmarCancelarAgendamentoModal({ closeModalAgendamento, confirmarAgendamento, agendamentoId, schedule }: ConfirmarCancelarAgendamentoProps) {
    const [isReagendarModalOpen, setIsReagendarModalOpen] = useState(false);
    console.log("ConfirmarCancelar  1 " + schedule)
    
    const handleConfirmarCancelarAgendamento = async () => {
        console.log("Agendamento no ConfirmarCancelar " + agendamentoId);
        
        try {
            if (agendamentoId === undefined) {
                console.error("ID do agendamento não está definido.");
                return;
            }

            // Salva o agendamento antes de excluir

            await api.delete('api/user/erase', {
                data: { id: agendamentoId }   
            });
            confirmarAgendamento();
            setIsReagendarModalOpen(true);
        } catch (error) {
            console.error("Erro ao cancelar agendamento:", error);
            
        }
    };

    const closeReagendarModal = () => {
        setIsReagendarModalOpen(false);
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center defaultFontStyles bg-black bg-opacity-50">
                <div className="w-72 bg-white rounded-xl shadow-navbar">
                    <div className="flex justify-between items-center bg-customGray-400 rounded-t-lg py-3 px-3">
                        <span className="text-base md:font-bold text-customGray-100">Cancelar</span>
                        <X 
                            className="text-customGray-300 cursor-pointer hover:text-customGray-100" 
                            onClick={closeModalAgendamento} 
                        />
                    </div>

                    <div className="flex flex-col py-10 px-5">
                        <h2 className="text-lg font-bold text-center">Tem certeza?</h2>
                        <span className="text-center text-customGray-300 mt-4">
                            Deseja <span className="font-bold text-customGray-400">cancelar </span>{schedule.service} às {format(schedule.dateTime, " HH:mm, EEEE, d 'de' MMMM", { locale: ptBR })}?
                        </span>

                        <div className="flex justify-end mt-6 gap-4">
                            <button
                                className="transform hover:translate-y-[-5px] ease-in-out duration-300 px-4 py-2 rounded-md text-red-600"
                                onClick={closeModalAgendamento}
                            >
                                Cancelar
                            </button>
                            <button
                                className="transform hover:translate-y-[-5px] ease-in-out duration-300 px-4 py-2 rounded-md text-green-500 w-24"
                                onClick={handleConfirmarCancelarAgendamento}
                            >
                                Sim
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isReagendarModalOpen && schedule &&(
                <ReagendarModal closeModal={closeReagendarModal}  
                schedule={schedule}/>
            )}
        </>
    );
}
