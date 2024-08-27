import { ArrowLeft, UserCircle2, BellIcon, LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/navbar/navbar';

export function Mais() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen pb-24 md:pb-10 defaultFontStyles md:pl-20">
            <div className="bg-customGray-400 p-4 flex items-center gap-4 h-16 shadow-navbar">
                <ArrowLeft
                    className="text-zinc-50 cursor-pointer size-6 md:hover:text-customGray-100 md:hover:size-7"
                    onClick={() => navigate('/')}
                />
                <span className="text-zinc-50 md:text-lg">Opções adicionais</span>
            </div>
            <div className="flex flex-col gap-8 px-8 mt-8 items-start md:items-center md:text-xl">
                <div className='flex flex-col h-full gap-8 md:gap-12'>
                    <button
                        className="flex items-center gap-4 text-customBlack md:hover:translate-y-[-4px] md:hover:font-bold"
                        onClick={() => navigate('/informacoes-pessoais')}
                    >
                        <UserCircle2 className="size-5 md:size-8" />
                        <span>Informações pessoais</span>
                    </button>
                    <button
                        className="flex items-center gap-4 text-customBlack md:hover:translate-y-[-4px] md:hover:font-bold"
                        onClick={() => navigate('/notificacoes')}
                    >
                        <BellIcon className="size-5 md:size-8 fill-current" />
                        <span>Notificações</span>
                    </button>
                    <button
                        className="flex items-center gap-4 text-customBlack md:hover:translate-y-[-4px] md:hover:font-bold"
                        onClick={() => navigate('/')}
                    >
                        <LogOutIcon className="size-5 md:size-8 " />
                        <span>Sair</span>
                    </button>
                </div>

            </div>

            <Navbar />
        </div>
    );
}
