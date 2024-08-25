import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../../navbar/navbar';
import { CancelarAgendamentoModal } from './cancelarAgendamentoModal';
import { ConfirmarCancelarAgendamentoModal } from './confirmar-cancelarAgendamentoModal';
import { ReagendarModal } from './reagendarModal';
//Esse deu trabalho(e ainda vai dar)
export function Agendamento() {
    const navigate = useNavigate();
    const [isLoggedIn] = useState(true); // Simulação de usuário logado
    const [isModalAgendamentoOpen, setIsModalAgendamentoOpen] = useState(false); // Estado para controlar o modal
    const [isConfirmarCancelarModalOpen, setIsConfirmarCancelarModalOpen] = useState(false); // Estado do modal Confirmar
    const [isReagendarModalOpen, setIsReagendarModalOpen] = useState(false); // Estado do modal Reagendar

    if (!isLoggedIn) {
        navigate('/cadastro'); 
        return null;
    }

    const openModalAgendamento = () => {
        setIsModalAgendamentoOpen(true); // Abre o modal CancelarAgendamento
    };

    const closeModalAgendamento = () => {
        setIsModalAgendamentoOpen(false); // Fecha o modal CancelarAgendamento
    };

    const openConfirmarCancelarModal = () => {
        setIsConfirmarCancelarModalOpen(true); // Abre o modal ConfirmarCancelarAgendamento
    };

    const closeConfirmarCancelarModal = () => {
        setIsConfirmarCancelarModalOpen(false); // Fecha o modal ConfirmarCancelarAgendamento
    };

    const openReagendarModal = () => {
        setIsReagendarModalOpen(true); // Abre o modal ReagendarModal
    };

    const closeAllModalsAndOpenReagendar = () => {
        closeModalAgendamento();
        closeConfirmarCancelarModal();
        openReagendarModal(); // Fecha todos os modais e abre o ReagendarModal
    };

    return (
        <div className="flex flex-col min-h-screen pb-24 md:pb-10 defaultFontStyles md:pl-20">
            <div className="bg-customGray-400 p-4 flex items-center gap-4 h-16 shadow-navbar">
                <ArrowLeft
                    className="text-zinc-50 cursor-pointer size-6 md:hover:text-customGray-100 md:hover:size-7"
                    onClick={() => navigate('/')} 
                />
                <span className="text-zinc-50 md:text-lg">Meus Agendamentos</span>
            </div>
            <div className="flex flex-col gap-8 px-8 mt-8 items-center">
                <span className="font-bold mr-auto md:mr-0">agosto, 2024</span>
                
                <button
                    className="flex bg-customGray-100 border-l-4 border-blue-500 w-80 md:w-96 h-28 rounded-xl px-7 py-6 gap-3 shadow-navbar transform hover:translate-y-[-5px] ease-in-out duration-300"
                    onClick={openModalAgendamento} // Abre o modal ao clicar no botão
                >
                    <div className="flex flex-col justify-start text-center gap-4 font-bold">
                        <span>ago.</span>
                        <span>02</span>
                        <span>11:00</span>
                    </div>
                    <div className="border-l border-customGray-400 h-full"></div>
                    <div className="flex flex-col justify-start items-start font-bold gap-4">
                        <span className="text-customBlack">Barba</span>
                        <span className="text-customGray">Qualquer disponível</span>
                        <span className="text-blue-500">AGENDADO</span> 
                    </div>
                </button>
            </div>

            <Navbar />

            {isModalAgendamentoOpen && (
                <CancelarAgendamentoModal
                    closeModalAgendamento={closeModalAgendamento}
                    openConfirmarCancelarModal={openConfirmarCancelarModal}
                />
            )}

            {isConfirmarCancelarModalOpen && (
                <ConfirmarCancelarAgendamentoModal
                    closeModalAgendamento={closeConfirmarCancelarModal}
                    confirmarAgendamento={closeAllModalsAndOpenReagendar}
                />
            )}

            {isReagendarModalOpen && (
                <ReagendarModal closeModal={() => setIsReagendarModalOpen(false)} />
            )}
        </div>
    );
}
