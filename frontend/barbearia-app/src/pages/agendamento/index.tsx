import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../../components/navbar/navbar';
import { CancelarAgendamentoModal } from './cancelarAgendamentoModal';
import { ConfirmarCancelarAgendamentoModal } from './confirmar-cancelarAgendamentoModal';
import { ReagendarModal } from './reagendarModal';
import { useAuth } from '../../context/authcontext'; 
import { api } from '../../lib/axios';
export interface Schedules {
    id: number
    dateTime: string
    barberId: string
    service: string
    serviceValue:string
    barberName: string
}

export function Agendamento() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth(); 
    const [isModalAgendamentoOpen, setIsModalAgendamentoOpen] = useState(false); 
    const [isConfirmarCancelarModalOpen, setIsConfirmarCancelarModalOpen] = useState(false);
    const [isReagendarModalOpen, setIsReagendarModalOpen] = useState(false);
    const [schedules, setSchedules] = useState<Schedules[]>([]);
    const {loading} = useAuth();
    const [error, setError] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState<Schedules | null>(null); // Adiciona o estado para o agendamento selecionado

    useEffect(() => {
        if (!loading) {
            if (!isLoggedIn) {
                navigate('/cadastro');
            } else {
                const getSchedules = async () => {
                    try {
                        const response = await api.get<Schedules[]>('/api/user/schedules');
                        setSchedules(response.data);
                    } catch (err) {
                        setError("Erro ao carregar agendamentos." + err);
                    } 
                };

                getSchedules();
            }
        }
    }, [isLoggedIn, navigate,loading]);

    const openModalAgendamento = (schedule: Schedules) => {
        console.log("Agendamento selecionado:", schedule);
        setSelectedSchedule(schedule); // Define o agendamento selecionado
        setIsModalAgendamentoOpen(true);
    };

    const closeModalAgendamento = () => {
        setIsModalAgendamentoOpen(false);
        setSelectedSchedule(null); // Limpa o agendamento selecionado ao fechar o modal
    };

    const openConfirmarCancelarModal = () => {
        setIsConfirmarCancelarModalOpen(true);

    };

    const closeConfirmarCancelarModal = () => {
        setIsConfirmarCancelarModalOpen(false);
    };

    const openReagendarModal = () => {
        setIsReagendarModalOpen(true);
    };

    const closeAllModalsAndOpenReagendar = () => {
        closeModalAgendamento();
        closeConfirmarCancelarModal();
        openReagendarModal();
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
                
                {loading && <p>Carregando agendamentos...</p>}
                {error && <p>{error}</p>}
                {schedules.length === 0 && !loading && <p>Você não tem agendamentos.</p>}
                
                {schedules.map((agendamento) => (
                    <button
                        key={agendamento.id}
                        className="flex bg-customGray-100 border-l-4 border-blue-500 w-80 md:w-96 h-28 rounded-xl px-7 py-6 gap-3 shadow-navbar transform hover:translate-y-[-5px] ease-in-out duration-300"
                        onClick={() => openModalAgendamento(agendamento)} // Passa o agendamento selecionado
                    >
                        <div className="flex flex-col justify-start text-center gap-4 font-bold">
                            <span>{new Date(agendamento.dateTime).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                            <span>{new Date(agendamento.dateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="border-l border-customGray-400 h-full"></div>
                        <div className="flex flex-col justify-start items-start font-bold gap-4">
                            <span className="text-customBlack">{agendamento.service}</span>
                            <span className="text-customGray">{agendamento.barberName}</span>
                            <span className="text-blue-500">AGENDADO</span> 
                        </div>
                    </button>
                ))}
            </div>

            <Navbar />

            {isModalAgendamentoOpen && selectedSchedule && (
                <CancelarAgendamentoModal
                    closeModalAgendamento={closeModalAgendamento}
                    openConfirmarCancelarModal={openConfirmarCancelarModal}
                    schedule={selectedSchedule} // Passa o agendamento selecionado para o modal
                />
            )}

            {isConfirmarCancelarModalOpen && (
                <ConfirmarCancelarAgendamentoModal
                    closeModalAgendamento={closeConfirmarCancelarModal}
                    confirmarAgendamento={closeAllModalsAndOpenReagendar}
                     agendamentoId={selectedSchedule?.id}
                     schedule={selectedSchedule}
                />
            )}

            {isReagendarModalOpen && ( 
                <ReagendarModal closeModal={() => setIsReagendarModalOpen(false)}    
                schedule={selectedSchedule}
                />
            )}
        </div>
    );
}
