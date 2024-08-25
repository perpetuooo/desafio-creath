import { ArrowLeft, BellIcon, ToggleRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from '../../../navbar/navbar';

export function Notificacoes() {
    const navigate = useNavigate();
    const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);

    const handleToggle = () => {
        if (!notificacoesAtivas) {
            const permitirNotificacoes = window.confirm(
                "Deseja permitir notificações deste site?"
            );
            if (permitirNotificacoes) {
                setNotificacoesAtivas(true);
            }
        } else {
            setNotificacoesAtivas(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen pb-24 defaultFontStyles md:pl-20">
            <div className="bg-customGray-400 p-4 flex items-center gap-4 h-16 shadow-navbar">
                <ArrowLeft
                    className="text-zinc-50 cursor-pointer size-6 md:hover:text-customGray-100 md:hover:size-7"
                    onClick={() => navigate('/mais')}
                />
                <span className="text-zinc-50 md:text-lg">Notificações</span>
            </div>

            <div className="flex flex-col gap-8 px-8 mt-8 items-center w-full">
                <div className="w-full md:w-5/6 p-4 border rounded-md shadow-navbar text-base bg-transparent text-customBlack md:font-bold text-center">
                    Habilitando as notificações, você poderá ser notificado sobre seus agendamentos e confirmar de forma mais fácil e rápida.
                </div>

                <div className="flex items-center justify-between md:justify-around w-full mt-4 md:font-bold md:text-base">
                    <div className="flex items-center gap-4">
                        <BellIcon className="size-6 text-customBlack" />
                        <span className="text-customBlack">Ativar Notificações</span>
                    </div>
                    <button onClick={handleToggle}>
                        <ToggleRight
                            className={`size-6 md:size-8 ${
                                notificacoesAtivas ? 'text-blue-500' : 'text-customGray-400'
                            } transition-transform duration-300 ease-in-out transform ${
                                notificacoesAtivas ? 'rotate-0' : 'rotate-180'
                            }`}
                        />
                    </button>
                </div>
            </div>

            <Navbar />
        </div>
    );
}
