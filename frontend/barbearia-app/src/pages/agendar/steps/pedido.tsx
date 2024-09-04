import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, CheckCircle, ArrowLeft, LockKeyholeIcon } from 'lucide-react';
import { Navbar } from '../../../components/navbar/navbar';
import { PedidoConcluidoModal } from './pedido-concluido-modal';
import { useAgendarStepValidation } from '../../../hooks/agendar-step-validation';
import { useAgendar } from '../../../context/agendarContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '../../../context/authcontext';
import { api } from '../../../lib/axios';

export function Pedido() {
    const navigate = useNavigate();
    const { validateStep } = useAgendarStepValidation('pedido');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { agendamentos, removeAgendamento, setAgendamentos, addAgendamento} = useAgendar();
    const [total, setTotal] = useState(0);
    const { isLoggedIn } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        validateStep();
            addAgendamento();
    },[]);

    useEffect(() => {
        if (agendamentos.length > 0) {
            console.log('Esse vem do Pedido:', agendamentos);

            let totalSum = 0;
            agendamentos.forEach(agendamento => {
                if (agendamento.service?.value) {
                    totalSum += parseFloat(agendamento.service.value.replace('R$ ', '').replace(',', '.'));
                }
            });
            setTotal(totalSum);
        } else {
            setTotal(0); 
        }
    }, [agendamentos]);


    const handleAddAgendamentos = () => {
        navigate('/agendar');
    };

    const handleRemoveAgendamentos = (index: number) => {
        removeAgendamento(index);
    };

    const closeModalPedidoConcluido = () => {
        setIsModalOpen(false);
    };

    const handleConcluirAgendamento = async () => {
        
        agendamentos.forEach(agendamento => {
            console.log("DateTime:", agendamento.dateTime.toISOString());
            console.log("Barber ID:", agendamento.barber.id);
            console.log("Service Title:", agendamento.service.title);
            console.log("Service Value:", agendamento.service.value);
            console.log("Barber Name:", agendamento.barber.name);
        });
        
        const transformedAgendamentos = agendamentos.map(agendamento => ({
            dateTime: agendamento.dateTime.toISOString(), 
            barberId: agendamento.barber.id,
            service: agendamento.service.title,
            serviceValue: agendamento.service.value,
            barberName: agendamento.barber.name
        }));

        console.log(transformedAgendamentos)
    
        try {
            // Enviar o array diretamente
            const response = await api.post('api/user/create', transformedAgendamentos);
            console.log(response)
            if (response.status === 201) {
                setAgendamentos([]);
                setIsModalOpen(true);
                setErrorMessage(null);
            }
        } catch (error) {
            console.error("Erro ao concluir agendamentos:", error);
            setErrorMessage("Ocorreu um erro ao tentar agendar!  " + " " + error)
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000); 
        }
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
            {errorMessage &&
                <div className="text-red-800 bg-red-100 border border-red-300 p-3 rounded-md text-center mt-4">
                    {errorMessage}
                </div>
            }

            {isLoggedIn ? (
                <div className="flex flex-col gap-8 px-8 mt-8 items-center flex-grow">
                    <div className="flex flex-col gap-8 items-center w-full max-w-md space-y-3">
                        {agendamentos.length > 0 ? (
                            agendamentos.map((Agendamentos, index) => {
                                const agendamentoDateTime = new Date(Agendamentos.dateTime);
                                const formattedMonth = agendamentoDateTime ? format(Agendamentos.dateTime, 'MMM') : '';
                                const formattedDay = agendamentoDateTime ? format(Agendamentos.dateTime, 'dd') : '';
                                const formattedTime = agendamentoDateTime ? format(Agendamentos.dateTime, 'HH:mm') : '';
    
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
                                            <span className="text-customGray">{Agendamentos.barber ? Agendamentos.barber.name : 'Qualquer um'}</span>
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
                <div className="flex flex-col gap-8 px-4 mt-8 items-center flex-grow">
                    <div className="flex flex-col gap-8 items-center w-full max-w-md space-y-3">
                        {agendamentos.length > 0 ? (
                            agendamentos.map((Agendamentos, index) => {
                                const formattedMonth = Agendamentos.dateTime ? format(Agendamentos.dateTime, 'MMM', { locale: ptBR }) : '';
                                const formattedDay = Agendamentos.dateTime ? format(Agendamentos.dateTime, 'dd', { locale: ptBR }) : '';
                                const formattedTime = Agendamentos.dateTime ? format(Agendamentos.dateTime, 'HH:mm', { locale: ptBR }) : '';
    
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
                                            <span className="text-customGray">{Agendamentos.barber ? Agendamentos.barber.name : 'Qualquer um'}</span>
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
                    </div>
    
                    <button
                        className="text-customGray-400 bg-transparent border border-customGray-400 px-4 py-2 rounded-md flex items-center gap-2 md:hover:bg-customGray-400 md:hover:text-customGray-100 md:hover:border-black transform ease-in-out duration-300"
                        onClick={handleAddAgendamentos}>
                        <Plus className="size-5" />
                        ADICIONAR OUTRO
                    </button>
    
                    <button
                        className=" mt-auto  text-customGray-100 bg-customGray-400 px-2 py-4 rounded-md flex items-center justify-center transform hover:translate-y-[-5px] ease-in-out duration-300 gap-2 w-full h-14 md:w-80 shadow-navbar"
                        onClick={() => navigate('/cadastro', { state: { from: window.location.pathname } })}
                    >
                        <LockKeyholeIcon className=" size-5 text-customYellow" />
                        FAZER LOGIN
                    </button>
                </div>
            )}
    
            <Navbar />
    
            {isModalOpen && <PedidoConcluidoModal closeModalPedidoConcluido={closeModalPedidoConcluido} />}
        </div>
    );
}
