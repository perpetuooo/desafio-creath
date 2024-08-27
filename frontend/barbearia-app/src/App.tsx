import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { HomePage } from "./pages/homepage";
import { Agendar } from "./pages/agendar";
import { SelecionarBarbeiro } from "./pages/agendar/steps/selecionar-barbeiros";
import { ResumoEEscolhaData } from "./pages/agendar/steps/resumo-e-escolha-data";
import { Pedido } from "./pages/agendar/steps/pedido";
import { Agendamento } from "./pages/agendamento";
import { Mais } from "./pages/mais";
import { MinhasInformacoes } from "./pages/mais/steps/minhas-informacoes";
import { Notificacoes } from "./pages/mais/steps/notificações";
import { Cadastro } from "./pages/cadastro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/> ,
  },
  {
    path: "/agendar",
    element: <Agendar/> ,
  },
  {
    path: "/selecionarBarbeiro",
    element: <SelecionarBarbeiro/> ,
  },
  {
    path: "/resumo",
    element: <ResumoEEscolhaData/> ,
  },
  {
    path: "/pedido",
    element: <Pedido/> ,
  },
  {
    path: "/agendamentos",
    element: <Agendamento/> ,
  },
  {
    path: "/mais",
    element: <Mais/>,
  },
  {
    path: "/informacoes-pessoais",
    element: <MinhasInformacoes/>,
  },
  {
    path: "/notificacoes",
    element: <Notificacoes/>,
  },
  {
    path: "/cadastro",
    element: <Cadastro/>,
  },

]);

export function App() {
  return <RouterProvider router={router}/>
}
