import { useNavigate } from "react-router-dom";
import { Home, Clock, CalendarRange, MoreHorizontal } from 'lucide-react';
import { NavbarItem } from './navbar-item';

export function Navbar() {
    const navigate = useNavigate(); 

    return (
        <div className="bg-customGray-100 w-full h-16 shadow-navbar fixed bottom-0 left-0 flex justify-evenly items-center z-50 
            md:flex-col md:w-16 md:h-full md:top-0 md:left-0 md:bottom-auto  
            max-sm:rounded-b-3xl md:px-10">
            <button onClick={() => navigate('/')} className="focus:outline-none" title="Ir para a Página Inicial"> 
                <NavbarItem icon={Home} text="Início" />
            </button>
            <button onClick={() => navigate('/agendar')} className="focus:outline-none" title="Ir para a Página Agendar"> 
                <NavbarItem icon={Clock} text="Agendar" />
            </button>
            <button onClick={() => navigate('/agendamentos')} className="focus:outline-none" title="Ir para a Página Meus Agendamentos"> 
                <NavbarItem icon={CalendarRange} text="Agendados" />
            </button>
            <button onClick={() => navigate('/mais')} className="focus:outline-none" title="Ir para a Página de Configurações">
                <NavbarItem icon={MoreHorizontal} text="Mais"  />
            </button>     
        </div>
    );
}
