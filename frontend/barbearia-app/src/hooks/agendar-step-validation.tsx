import { useNavigate } from 'react-router-dom';
import { useAgendar } from '../context/agendarContext';

export const useAgendarStepValidation = (requiredStep: string) => {
  const { selectedService, selectedBarber, selectedDateTime } = useAgendar();
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
