import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, User } from 'lucide-react'; 
import { Navbar } from '../../navbar/navbar';

export function SelecionarBarbeiro() {
    const navigate = useNavigate();

    // Simulação de barbeiros disponíveis no backend
    const barbeiros = [
        { name: 'Nome do Barbeiro', icon: <User className="text-customBlack" /> },
        { name: 'Nome do Barbeiro', icon: <User className="text-customBlack" /> },
        { name: 'Nome do Barbeiro', icon: <User className="text-customBlack" /> },
        { name: 'Nome do Barbeiro', icon: <User className="text-customBlack" /> },
        { name: 'Nome do Barbeiro', icon: <User className="text-customBlack" /> },
    ];

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
                    <span className="text-customGray-400 md:text-sm md:font-bold">
                        Escolha uma opção
                    </span>
                </div>

                <div className="flex flex-col gap-4">
                    {barbeiros.map((barbeiro, index) => (
                        <button
                            key={index}
                            className="flex items-center justify-between p-6 border-b border-customGray-300 text-left md:hover:translate-y-[-4px]" // Alterado de p-4 para p-6
                            title='Clique para selecionar o Barbeiro desejado'
                            onClick={() => navigate('/resumo')}
                        >
                            <div className="flex items-center gap-2">
                                {barbeiro.icon}
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
