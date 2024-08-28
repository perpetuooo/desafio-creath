import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, User } from 'lucide-react';
import { Navbar } from '../../../components/navbar/navbar';
import { useAgendar } from '../../../context/agendarContext';
import { useAgendarStepValidation } from '../../../hooks/agendar-step-validation';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/axios';

interface Barbeiro {
    id: string; 
    name: string;
    phone: string;
}

export function SelecionarBarbeiro() {
    const navigate = useNavigate();
    const { validateStep } = useAgendarStepValidation('selecionarBarbeiro');
    const { setSelectedBarber } = useAgendar();
    const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);

    useEffect(() => {
        validateStep();
        getBarbeiros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getBarbeiros = async () => {
        console.log('Buscando barbeiros...');
        try {
           
            const response = await api.get<Barbeiro[]>('/api/barber/barbers'); 
            setBarbeiros(response.data);
        } catch (error) {
            console.error('Erro ao buscar barbeiros:', error);
        }
    };

    const handleSelectBarber = (barbeiro: Barbeiro) => {
        setSelectedBarber(barbeiro.name); 
        console.log(barbeiro)
        navigate('/resumo');
    };

    return (
        <div className="flex flex-col min-h-screen pb-16 defaultFontStyles md:pl-20"> 
            <div className="bg-customGray-400 p-4 flex items-center gap-4 h-16 shadow-navbar">
                <ArrowLeft
                    className="text-zinc-50 cursor-pointer size-6 md:hover:text-customGray-100 md:hover:size-7"
                    onClick={() => navigate('/agendar')} 
                />
                <span className="text-zinc-50 md:text-lg">Agendamento</span>
            </div>
            <div className="flex-grow flex flex-col gap-4 px-4"> 
                <div className="flex flex-col items-center justify-center gap-4 mt-8">
                    <span className="text-customGray-400 md:text-sm md:font-bold">Escolha um barbeiro</span>
                </div>

                <div className="flex flex-col gap-4">
                    {barbeiros.map((barbeiro) => (
                        <button
                            key={barbeiro.id} 
                            className="flex items-center justify-between p-4 border-b border-customGray-300 text-left md:hover:translate-y-[-4px]"
                            onClick={() => handleSelectBarber(barbeiro)}
                        >
                            <div className="flex items-center gap-2">
                                <User className="text-customBlack" />
                                <span className="text-customBlack font-bold text-sm">{barbeiro.name}</span>
                            </div>
                            <ChevronRight className="md:hover:text-customGray-400 ease-in-out duration-300 text-customBlack size-6 md:hover:size-7 md:cursor-pointer" />     
                        </button>
                    ))}
                </div>
            </div>
            <Navbar />
        </div>
    );
}
