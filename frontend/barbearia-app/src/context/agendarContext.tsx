import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Agendamento {
    service: { title: string; duration: string; value: string };
    barber: {id: string; name: string; phone: string};
    dateTime: Date;
}

interface AgendarContextProps {
    selectedService: { title: string; duration: string; value: string } | null;
    setSelectedService: (service: { title: string; duration: string; value: string } | null) => void;
    selectedBarber: {id: string; name: string; phone: string} | null;
    setSelectedBarber: (barber: {id: string; name: string; phone: string} | null) => void;
    selectedDateTime: Date | null;
    setSelectedDateTime: (dateTime: Date | null) => void;
    agendamentos: Agendamento[];
    setAgendamentos: (agendamentos: Agendamento[]) => void;
    addAgendamento: () => void;
    removeAgendamento: (index: number) => void;
}

const AgendarContext = createContext<AgendarContextProps | undefined>(undefined);

export function useAgendar() {
    const context = useContext(AgendarContext);
    if (context === undefined) {
        throw new Error('useAgendar must be used within an AgendarProvider');
    }
    return context;
}

export function AgendarProvider({ children }: { children: ReactNode }) {
    const [selectedService, setSelectedService] = useState<{ title: string; duration: string; value: string } | null>(null);
    const [selectedBarber, setSelectedBarber] = useState<{ id: string; name: string; phone: string } | null>(null);
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>(() => {
        const storedAgendamentos = localStorage.getItem('agendamentos');
        if (storedAgendamentos) {
            try {
                return JSON.parse(storedAgendamentos).map((agendamento: Agendamento) => ({
                    ...agendamento,
                    dateTime: new Date(agendamento.dateTime),
                }));
            } catch (error) {
                console.error("Erro ao parsear agendamentos do localStorage", error);
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    }, [agendamentos]);

    const addAgendamento = () => {
        if (selectedService && selectedBarber && selectedDateTime) {
            const newAgendamento = {
                service: selectedService,
                barber: selectedBarber,
                dateTime: selectedDateTime,
            };
            const updatedAgendamentos = [...agendamentos, newAgendamento];
            setAgendamentos(updatedAgendamentos);
        }
    };

    const removeAgendamento = (index: number) => {
        const updatedAgendamentos = agendamentos.filter((_, i) => i !== index);
        setAgendamentos(updatedAgendamentos);
    };

    return (
        <AgendarContext.Provider value={{
            selectedService,
            setSelectedService,
            selectedBarber,
            setSelectedBarber,
            selectedDateTime,
            setSelectedDateTime,
            agendamentos,
            setAgendamentos,
            addAgendamento,
            removeAgendamento
        }}>
            {children}
        </AgendarContext.Provider>
    );
}
