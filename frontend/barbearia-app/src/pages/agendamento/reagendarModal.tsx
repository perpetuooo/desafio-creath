import { X, ConciergeBellIcon, UserIcon } from 'lucide-react';

interface ReagendarModalProps {
    closeModal: () => void;
}

export function ReagendarModal({ closeModal }: ReagendarModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-72 bg-white rounded-xl shadow-navbar">
                <div className="flex justify-between items-center bg-customGray-400 rounded-t-lg py-3 px-3">
                    <span className="text-base md:font-bold text-customGray-100">Reagendar</span>
                    <X 
                        className="text-customGray-300 cursor-pointer hover:text-customGray-100" 
                        onClick={closeModal} 
                    />
                </div>

                <div className="flex flex-col py-10 px-5">
                    <span className="text-center text-customGray-300 mt-4">
                        Deseja agendar para outro horário?
                    </span>
                    
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex items-center gap-4">
                            <ConciergeBellIcon className="size-5 font-bold" />
                            <span className="text-customGray-300">Barba</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <UserIcon className="size-5 font-black" />
                            <span className="text-customGray-300">Qualquer Disponível</span>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            className="transform hover:translate-y-[-5px] ease-in-out duration-300 px-4 py-2 rounded-md text-red-600"
                            onClick={closeModal}
                        >
                            Não quero Agendar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
