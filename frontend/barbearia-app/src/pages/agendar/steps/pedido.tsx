import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, CheckCircle, ArrowLeft } from 'lucide-react';
import { Navbar } from '../../../components/navbar/navbar';
import { PedidoConcluidoModal } from './pedido-concluido-modal';
import { useAgendarStepValidation } from '../../../hooks/agendar-step-validation';
import { useAgendar } from '../../../context/agendarContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function Pedido() {
    const navigate = useNavigate();
    const { validateStep } = useAgendarStepValidation('pedido');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { agendamentos, removeAgendamento } = useAgendar();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        validateStep();
        
        // Adiciona log para verificar se agendamentos estão carregados
        console.log('Esse vem do Pedido:', agendamentos);

        let totalSum = 0;
        agendamentos.forEach(agendamento => {
            if (agendamento.service?.value) {
                totalSum += parseFloat(agendamento.service.value.replace('R$ ', '').replace(',', '.'));
            }
        });
        setTotal(totalSum);
    }, [agendamentos, validateStep]);

    const isLoggedIn = true;

    const handleAddAgendamentos = () => {
        navigate('/agendar');
    };

    const handleRemoveAgendamentos = (index: number) => {
        removeAgendamento(index);
    };

    const handleConcluirAgendamento = () => {
        setIsModalOpen(true);
    };

    const closeModalPedidoConcluido = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col min-h-screen pb-24 md:pb-10 defaultFontStyles md:pl-20">
            <div className="bg-customGray-400 p-4 flex items-center gap-4 h-16 shadow-navbar">
                <ArrowLeft
                    className="text-zinc-50 cursor-pointer size-6 md:hover:text-customGray-100 md:hover:size-7"
                    onClick={() => navigate('/resumo')}
                />
                <span className="text-zinc-50 md:text-lg">Pedido</span>
            </div>

            {isLoggedIn ? (
                <div className="flex flex-col gap-8 px-8 mt-8 items-center flex-grow">
                    <div className="flex flex-col gap-8 items-center w-full max-w-md space-y-3">
                        {agendamentos.length > 0 ? (
                            agendamentos.map((Agendamentos, index) => {
                                const formattedMonth = Agendamentos.dateTime ? format(Agendamentos.dateTime, 'MMM', { locale: ptBR }) : '';
                                const formattedDay = Agendamentos.dateTime ? format(Agendamentos.dateTime, 'dd') : '';
                                const formattedTime = Agendamentos.dateTime ? format(Agendamentos.dateTime, 'HH:mm') : '';

                                return (
                                    <div key={index} className="flex bg-customGray-100 w-full md:w-96 h-28 rounded-xl px-7 py-6 gap-3 shadow-navbar">
                                        <div className="flex flex-col justify-start text-center gap-4 font-bold">
                                            <span>{formattedMonth}</span>
                                            <span>{formattedDay}</span>
                                            <span>{formattedTime}</span>
                                        </div>
                                        <div className="border-l border-customGray-400 h-full"></div>
                                        <div className="flex flex-col justify-start font-bold gap-4">
                                            <span className="text-customBlack">{Agendamentos.service?.title ? Agendamentos.service.title : 'Serviço'}</span>
                                            <span className="text-customGray">{Agendamentos.barber ? Agendamentos.barber : 'Qualquer um'}</span>
                                            <span className="text-customGray">{Agendamentos.service?.value}</span>
                                        </div>
                                        <button
                                            className="flex flex-1 justify-end items-center text-customGray md:hover:text-customGray-400"
                                            onClick={() => handleRemoveAgendamentos(index)}
                                        >
                                            <Trash2 className="size-5" />
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <p>Nenhum agendamento encontrado.</p>
                        )}

                        <button
                            className="text-customGray-400 bg-transparent border border-customGray-400 px-4 py-2 rounded-md flex items-center gap-2 md:hover:bg-customGray-400 md:hover:text-customGray-100 md:hover:border-black transform ease-in-out duration-300"
                            onClick={handleAddAgendamentos}
                        >
                            <Plus className="size-5" />
                            ADICIONAR OUTRO
                        </button>

                        <div className="flex flex-col gap-4 w-full">
                            <span className="font-bold text-customBlack">Formas de Pagamento</span>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-customBlack size-5" />
                                <span className="font-bold text-customBlack">Pagar no dia / Presencial</span>
                            </div>
                            <div className="flex items-center justify-between font-bold">
                                <span>Total: </span>
                                <span>R$ {total.toFixed(2)}</span>
                            </div>
                            <button className="text-blue-500 md:hover:text-blue-700 font-bold mr-auto">Adicionar observação</button>
                        </div>
                    </div>

                    <div className="mt-auto w-full flex justify-center">
                        <button
                            className="text-zinc-50 bg-customGray-400 px-4 py-2 rounded-md flex items-center justify-center transform hover:translate-y-[-5px] ease-in-out duration-300 w-full h-14 md:w-80 shadow-navbar"
                            onClick={handleConcluirAgendamento}
                        >
                            CONCLUIR AGENDAMENTO
                        </button>
                    </div>
                </div>
            ) : (
                <h1></h1>
            )}

            <Navbar />

            {isModalOpen && <PedidoConcluidoModal closeModalPedidoConcluido={closeModalPedidoConcluido} />}
        </div>
    );
}