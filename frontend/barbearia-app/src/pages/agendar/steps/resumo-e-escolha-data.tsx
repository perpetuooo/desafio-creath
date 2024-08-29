import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, X, ConciergeBell, User, Clock, ArrowLeftRight } from 'lucide-react';
import { Navbar } from '../../../components/navbar/navbar';
import { addDays, format, setHours, setMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAgendar } from '../../../context/agendarContext';
import { useAgendarStepValidation } from '../../../hooks/agendar-step-validation';

export function ResumoEEscolhaData() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { setSelectedDateTime, selectedService, selectedBarber, addAgendamento, agendamentos } = useAgendar();
    const { validateStep } = useAgendarStepValidation('resumo');

    useEffect(() => {
        console.log('Esse vem do Resumo', agendamentos);
        validateStep();
    }, [agendamentos, validateStep]);

    const generateSuggestedDates = () => {
        const today = new Date();
        const dates = [];

        for (let i = 0; i < 8; i++) {
            const date = addDays(today, i);
            const formattedDate = format(date, 'yyyy-MM-dd'); // Formato ISO
            if (format(date, 'EEEE', { locale: ptBR }) !== 'domingo') {
                dates.push({
                    dayOfWeek: format(date, 'EEEE', { locale: ptBR }),
                    day: format(date, 'dd'),
                    monthAndYear: format(date, 'MMMM yyyy', { locale: ptBR }),
                    date: formattedDate, // Adiciona a data no formato ISO
                    times: Array.from({ length: format(date, 'EEEE', { locale: ptBR }) === 'sábado' ? 6 : 13 }, (_, index) => ({
                        time: format(setHours(setMinutes(new Date(), 0), 9 + index), 'HH:mm')
                    }))
                });
            }
        }

        return dates;
    };

    const suggestedDates = generateSuggestedDates();

    const handleSelectDateTime = (date: string, time: string) => {
        const [year, month, day] = date.split('-').map(Number);
        const selectedDate = new Date(year, month-1, day); 
        if (isNaN(selectedDate.getTime())) {
            console.error('Data inválida:', date);
            return;
        }  
        const [hours, minutes] = time.split(':').map(Number);
        const selectedDateTime = setHours(setMinutes(selectedDate, minutes), hours);
        
        setSelectedDateTime(selectedDateTime);
        console.log("Data passada do resumo"+ selectedDateTime);
        // Adiciona o agendamento e navega após a atualização
        addAgendamento();
        navigate('/pedido');
    };



    return (
        <div className="flex flex-col min-h-screen pb-24 md:pb-10 defaultFontStyles md:pl-20">
            <div className="bg-customGray-400 p-4 flex items-center gap-4 h-16 shadow-navbar">
                <ArrowLeft
                    className="text-zinc-50 cursor-pointer size-6 md:hover:text-customGray-100 md:hover:size-7"
                    onClick={() => navigate('/selecionarBarbeiro')}
                />
                <span className="text-zinc-50 md:text-lg">Escolher data e horário</span>
                <X
                    className="ml-auto text-zinc-50 cursor-pointer size-6 md:hover:text-customGray-100 md:hover:size-7"
                    onClick={() => navigate('/')}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 mt-8 items-center">
                <span className="text-customGray-400 md:text-sm md:font-bold">Resumo</span>
                <div className="flex flex-col justify-around bg-customGray-100 w-80 h-28 rounded-lg px-7 py-6 gap-3">
                    <div className="flex items-center gap-2" title='Serviço escolhido'>
                        <ConciergeBell className="text-customBlack size-7 mr-2" />
                        <span className="text-customBlack font-bold">{selectedService?.title ? selectedService.title : 'Serviço'}</span>
                    </div>
                    <div className="flex items-center gap-2" title='Profissional Escolhido'>
                        <User className="text-customBlack size-7 mr-2" />
                        <span className="text-customGray-400">{selectedBarber?.name ? selectedBarber?.name :  'Qualquer um'}</span>
                        <button onClick={() => navigate('/agendar')} className="text-blue-500 ml-auto flex items-center gap-3 md:hover:text-blue-700" title='Clique para alterar o Agendamento'>
                            <ArrowLeftRight className='size-7' />
                            <span className="font-semibold">Alterar</span>
                        </button>
                    </div>
                </div>

                <span className="text-customGray-400 md:text-sm md:font-bold">Datas Sugeridas</span>
                <div className="flex items-center bg-customGray-100 p-2 rounded-xl w-full max-w-80 h-14 md:max-w-md" title='Pesquise pelo dia da semana'>
                    <input
                        type="text"
                        placeholder="Procurar dia da semana..."
                        className="bg-customGray-100 flex-grow p-2 outline-none text-customGray-400 placeholder:text-customGray-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className='md:hover:text-customGray-400 ease-in-out duration-300 text-customBlack'>
                        <Search className="ml-2 size-5 md:hover:size-7" />
                    </button>
                </div>

                <div className="flex flex-col gap-8 mt-8 w-full px-4" title='Data e Hora do Agendamento'>
                    {suggestedDates.map((date, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-customGray-400">
                                    <span className="font-bold text-customBlack">{date.dayOfWeek}</span>, {date.day} de {date.monthAndYear}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {date.times.map((time, index) => (
                                        <button 
                                            key={index} 
                                            className="bg-customGray-100 px-4 py-2 rounded-md flex items-center gap-2 md:hover:translate-y-[-4px] md:hover:font-bold md:hover:bg-customGray-400 ease-in-out text-customBlack md:hover:text-customGray-100" 
                                            title='Clique para selecionar o horário do Agendamento'
                                            onClick={() => handleSelectDateTime(date.date, time.time)}
                                        >
                                            <Clock className='size-3 md:size-5' />
                                            <span>{time.time}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {index < suggestedDates.length - 1 && (
                                <hr className="border-customGray-300" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Navbar />
        </div>
    );
}
