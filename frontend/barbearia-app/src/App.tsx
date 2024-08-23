import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { HomePage } from "./pages/homepage";
import { Agendamento } from "./pages/agendar";
import { SelecionarBarbeiro } from "./pages/agendar/steps/selecionar-barbeiros";
import { ResumoEEscolhaData } from "./pages/agendar/steps/resumo-e-escolha-data";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/> ,
  },
  {
    path: "/agendar",
    element: <Agendamento/> ,
  },
  {
    path: "/selecionarBarbeiro",
    element: <SelecionarBarbeiro/> ,
  },
  {
    path: "/resumo",
    element: <ResumoEEscolhaData/> ,
  },
  

]);

export function App() {
  return <RouterProvider router={router}/>
}

