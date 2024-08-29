// import { Trash2, Plus, Lock } from "lucide-react";


// export function PedidoDeslogado() {
//     return (
//         <div className="flex flex-col gap-8 px-4 mt-8 items-center flex-grow">
//         <div className="flex  bg-customGray-100 w-full md:w-96 h-28 rounded-xl px-7 py-6 gap-3 shadow-navbar">
//             <div className="flex flex-col justify-start text-center gap-4 font-bold">
//                 <span>{formattedMonth}</span>
//                 <span>{formattedDay}</span>
//                 <span>{formattedTime}</span>
//             </div>
//             <div className="border-l border-customGray-400 h-full"></div>
//             <div className="flex flex-col justify-start font-bold gap-4">
//                 <span className="text-customBlack">{selectedService?.title ? selectedService.title : 'Não selecionado!'}</span>
//                 <span className="text-customGray">{selectedBarber ? selectedBarber : 'Não selecionado!'}</span>
//                 <span className="text-customGray">{selectedService?.value}</span>
//             </div>
//             <button className="flex flex-1 justify-end items-center text-customGray md:hover:text-customGray-400">
//                 <Trash2 className="size-5" />
//             </button>
//         </div>

//         <button
//             className="text-customGray-400 bg-transparent border border-customGray-400 px-4 py-2 rounded-md flex items-center gap-2 md:hover:bg-customGray-400 md:hover:text-customGray-100 md:hover:border-black transform ease-in-out duration-300"
//         >
//             <Plus className="size-5" />
//             ADICIONAR OUTRO
//         </button>

//         <button
//             className=" mt-auto  text-customGray-100 bg-customGray-400 px-2 py-4 rounded-md flex items-center justify-center transform hover:translate-y-[-5px] ease-in-out duration-300 gap-2 w-full h-14 md:w-80 shadow-navbar"
//             onClick={() => navigate('/cadastro')}
//         >
//             <LockKeyholeIcon className=" size-5 text-customYellow" />
//             FAZER LOGIN
//         </button>
//     </div>
//     );
// }