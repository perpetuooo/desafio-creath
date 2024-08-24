import { Trash2, Plus, Lock } from "lucide-react";


export function PedidoDeslogado() {
    return (
        <div className="flex flex-col w-full px-4 mt-8">
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
                    ADICIONAR OUTRO
                </button>
            </div>

            <button className="mt-6 text-customGray-100 bg-customGray-400 py-2 px-4 rounded-md mx-auto block transform md:hover:translate-y-[-5px] transition ease-in-out">
                <Lock className="size-6" />
                FAZER LOGIN
            </button>
        </div>
    );
}