import { useNavigate } from "react-router-dom";
import { useAgendar } from '../context/agendarContext';
import { useAuth } from "../context/authcontext";

export const useAgendarStepValidation = (requiredStep: string) => {
  const { selectedService, selectedBarber, selectedDateTime, agendamentos } = useAgendar();
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();


  const validateStep = () => {
    switch (requiredStep) {
      case 'selecionarBarbeiro':
        if (!selectedService) {
          navigate('/agendar');
        }
        break;
      case 'resumo':
        if (!selectedService || !selectedBarber) {
          navigate('/selecionarBarbeiro');
        }
        break;
      case 'pedido':
        if(isLoggedIn || agendamentos.length > 0 )
          break;
        if (!selectedService || !selectedBarber || !selectedDateTime) {
          navigate('/resumo');
        }
        break;
      default:
        break;
    }
  };

  return { validateStep };
};
