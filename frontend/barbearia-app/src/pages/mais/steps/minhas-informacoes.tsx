import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../../components/navbar/navbar';
import { useAuth } from '../../../context/authcontext'; 
import { useEffect } from 'react';

export function MinhasInformacoes() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/cadastro');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="flex flex-col min-h-screen pb-24 defaultFontStyles md:pl-20">
            <div className="bg-customGray-400 p-4 flex items-center gap-4 h-16 shadow-navbar">
                <ArrowLeft
                    className="text-zinc-50 cursor-pointer size-6 md:hover:text-customGray-100 md:hover:size-7"
                    onClick={() => navigate('/mais')}
                />
                <span className="text-zinc-50 md:text-lg">Minhas Informações</span>
            </div>

            <div className="flex flex-col gap-8 px-8 mt-8 items-start w-full flex-grow pb-20 md:pb-0">
                <div className="flex flex-col gap-6 w-full md: text-base ">
                    <div className="flex flex-col w-full gap-2">
                        <label className="text-customGray-400 md:font-bold">Telefone</label>
                        <input
                            type="text"
                            className="text-customBlack w-full border-b border-customGray-300 focus:outline-none"
                            placeholder="(xx) xxxx-xxxx"
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <label className="text-customGray-400 md:font-bold">Nome</label>
                        <input
                            type="text"
                            className="text-customBlack w-full border-b border-customGray-300 focus:outline-none"
                            placeholder="Seu nome"
                        />
                    </div>
                    <div className="flex flex-col w-full md:font-bold gap-2">
                        <label className="text-customGray-400">E-mail</label>
                        <input
                            type="email"
                            className="text-customBlack w-full border-b border-customGray-300 focus:outline-none"
                            placeholder="seu.email@exemplo.com"
                        />
                    </div>
                    <div className="flex flex-col w-full md:font-bold gap-2">
                        <label className="text-customGray-400">Data de nascimento</label>
                        <input
                            type="date"
                            className="text-customBlack w-full border-b border-customGray-300 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex justify-center w-full mt-auto font-bold">
                    <button
                        className="w-36 h-8 text-blue-500 bg-transparent border border-blue-500 rounded-md hover:bg-blue-700 hover:text-zinc-50"
                        onClick={() => navigate('/')}
                    >
                        SALVAR
                    </button>
                </div>
            </div>
            <Navbar />
        </div>
    );
}
