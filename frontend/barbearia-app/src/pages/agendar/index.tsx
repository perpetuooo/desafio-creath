import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search, ArrowLeft } from 'lucide-react';
import { Navbar } from '../../components/navbar/navbar';
import { useAgendar } from '../../context/agendarContext';

export function Agendar() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { setSelectedService } = useAgendar();

    const serviços = [
        { title: 'Barba', duration: '30 minutos', value: 'R$ 20,00' },
        { title: 'Corte de Cabelo', duration: '1 hora', value: 'R$ 40,00' },
        { title: 'Corte de Cabelo + Barba', duration: '1 hora e 30 minutos', value: 'R$ 50,00' },
        { title: 'Progressiva', duration: '1 hora', value: 'R$ 100,00' },
        { title: 'Corte de Cabelo + Barba + Progressiva', duration: '2 horas e 30 minutos', value: 'R$ 150,00' },
    ];

    const filteredServices = serviços.filter(serviço =>
        serviço.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectService = (serviço: { title: string; duration: string; value: string }) => {
        console.log(setSelectedService(serviço));
        navigate('/selecionarBarbeiro');
    };

    return (
        <div className="flex flex-col min-h-screen pb-16 defaultFontStyles md:pl-20"> 
            <div className="bg-customGray-400 p-4 flex items-center gap-4 h-16 shadow-navbar">
                <ArrowLeft
                    className="text-zinc-50 cursor-pointer size-6 md:hover:text-customGray-100 md:hover:size-7"
                    onClick={() => navigate('/')}
                />
                <span className="text-zinc-50 md:text-lg">Agendamento</span>
            </div>
            <div className="flex-grow flex flex-col gap-4 px-4"> 
                <div className="flex flex-col items-center justify-center gap-4 mt-8">
                    <span className="text-customGray-400 md:text-sm md:font-bold">Escolha uma opção</span>

                    <div className="flex items-center bg-customGray-100 p-2 rounded-xl w-full max-w-80 h-14 md:max-w-md gap-1">
                        <input
                            type="text"
                            placeholder="Procurar..."
                            className="bg-customGray-100 flex-grow p-2 outline-none text-customGray-400 placeholder:text-customGray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className='md:hover:text-customGray-400 ease-in-out duration-300 text-customBlack'>
                            <Search className="ml-2 size-5 md:hover:size-7" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {filteredServices.map((serviço, index) => (
                        <button
                            key={index}
                            className="flex items-start justify-between p-4 border-b border-customGray-300 text-left md:hover:translate-y-[-4px]"
                            onClick={() => handleSelectService(serviço)}
                        >
                            <div className="flex flex-col">
                                <span className="text-customBlack font-bold text-sm">{serviço.title}</span>
                                <span className="text-customGray-400">{serviço.duration}</span>
                                <span className="text-customGray-400">{serviço.value}</span>
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
