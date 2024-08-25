import { Plus, Trash2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PedidoLogado() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full px-4 mt-8">
            <div className="flex items-center gap-4 mb-6">
                <Plus
                    className="text-zinc-50 cursor-pointer size-6 md:hover:text-customGray-100 md:hover:size-7"
                    onClick={() => navigate('/')}
                />
                <span className="text-zinc-50 md:text-lg font-bold">Pedido</span>
                <Plus
                    className="ml-auto text-customGray-400 cursor-pointer size-6 md:hover:text-customGray-100 md:hover:size-7"
                    onClick={() => navigate('/')}
                />
            </div>

            <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-customBlack font-bold">ago</span>
                        <span className="text-customBlack font-bold">02</span>
                        <span className="text-customBlack font-bold">11:00</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-customBlack font-bold">Barba</span>
                        <span className="text-customGray">Qualquer disponível</span>
                        <span className="text-customGray">R$ 60,00</span>
                    </div>
                    <Trash2 className="text-customGray cursor-pointer size-6 md:hover:text-customBlack" />
                </div>

                <button className="text-customGray-400 border border-customGray-400 bg-transparent py-2 px-4 rounded-md flex items-center justify-center gap-2 md:hover:bg-customGray-400 md:hover:text-customGray-100 md:hover:border-black transition ease-in-out">
                    <Plus className="size-6" />
                    Adicionar Envio
                </button>
            </div>

            <div className="flex flex-col gap-4">
                <span className="text-customBlack font-bold">Formas de Pagamento</span>
                <div className="flex items-center gap-2">
                    <CheckCircle className="text-customBlack size-6" />
                    <span className="text-customBlack font-bold">Pagar no dia / Presencial</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-customBlack font-bold">Total</span>
                    <span className="text-customBlack font-bold">R$ 60,00</span>
                </div>
                <span className="text-blue-950 font-bold cursor-pointer">Adicionar observação</span>
            </div>

            <button className="mt-6 text-customGray-100 bg-customGray-400 py-2 px-4 rounded-md mx-auto block transform md:hover:translate-y-[-5px] transition ease-in-out max-h-16 max-w-80">
                CONCLUIR AGENDAMENTO
            </button>
        </div>
    );
}
