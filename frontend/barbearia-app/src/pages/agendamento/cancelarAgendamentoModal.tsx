import { X, CalendarRange, AlarmClock, ConciergeBellIcon, UserIcon, Bookmark } from 'lucide-react';

interface CancelarAgendamentoModalProps {
    closeModalAgendamento: () => void;
    openConfirmarCancelarModal: () => void;
}

export function CancelarAgendamentoModal({ closeModalAgendamento, openConfirmarCancelarModal }: CancelarAgendamentoModalProps) {

    return (
        <div className="fixed inset-0 defaultFontStyles flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-72 bg-white rounded-xl shadow-navbar">
                <div className="w-full bg-customGray-400 rounded-t-lg flex justify-between items-center mb-4 py-3 px-3">
                    <span className="text-base md:font-bold text-customGray-100">Sua Reserva</span>
                    <X 
                        className="text-customGray-300 cursor-pointer hover:text-customGray-100" 
                        onClick={closeModalAgendamento} 
                    />
                </div>

                <div className="flex flex-col gap-4 py-6 px-5">
                    <div className="flex flex-col gap-3 space-y-2 text-left">
                        <div className="flex items-center gap-4">
                            <CalendarRange className="size-5 font-bold" />
                            <span className="text-customGray-300">02/08/24, sexta-feira</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <AlarmClock className="size-5 font-bold" />
                            <span className="text-customGray-300">11:00 às 11:30</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <ConciergeBellIcon className="size-5 font-bold" />
                            <span className="text-customGray-300">Barba</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <UserIcon className="size-5 font-black" />
                            <span className="text-customGray-300">Qualquer Disponível</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Bookmark className="size-5 font-bold" />
                            <span className="text-blue-500">Agendado</span>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            className="transform hover:translate-y-[-5px] ease-in-out duration-300  px-4 py-2 rounded-md text-red-600"
                            onClick={openConfirmarCancelarModal}>
                            Cancelar
                        </button>
                        <button
                            className="transform hover:translate-y-[-5px] ease-in-out duration-300  px-4 py-2 rounded-md text-green-500 w-24"
                            onClick={closeModalAgendamento}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


